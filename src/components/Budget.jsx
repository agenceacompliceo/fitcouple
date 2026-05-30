import { useState, useEffect } from "react";
import {
  IconPlus, IconTrash, IconChevronLeft, IconChevronRight,
  IconCircleCheck, IconClock, IconX,
} from "@tabler/icons-react";

const BUDGET_KEY = "fitcouple_budget";

const CATEGORIES = {
  income: ["Salaire", "Freelance", "Autre"],
  expense: ["Courses", "Loyer", "Sport", "Sortie", "Abonnement", "Autre"],
  loan: [],
};

const TAB_LABELS = { income: "Revenus", expense: "Dépenses", loan: "Prêts" };

const MONTHS_FR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function currentYearMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function formatYearMonth(ym) {
  const [y, m] = ym.split("-");
  return `${MONTHS_FR[parseInt(m, 10) - 1]} ${y}`;
}

function addMonths(ym, delta) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function fmtAmount(n) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

const EMPTY_FORM = { type: "expense", amount: "", category: "Courses", description: "", date: new Date().toISOString().split("T")[0], person: "", status: "pending" };

export default function Budget() {
  const [transactions, setTransactions] = useState(() => {
    try { return JSON.parse(localStorage.getItem(BUDGET_KEY)) || []; } catch { return []; }
  });
  const [month, setMonth] = useState(currentYearMonth);
  const [activeTab, setActiveTab] = useState("expense");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    localStorage.setItem(BUDGET_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const byMonth = (type) =>
    transactions.filter((t) => t.type === type && t.date.startsWith(month));

  const monthlyIncome = byMonth("income").reduce((s, t) => s + t.amount, 0);
  const monthlyExpense = byMonth("expense").reduce((s, t) => s + t.amount, 0);
  const balance = monthlyIncome - monthlyExpense;

  const allLoans = transactions.filter((t) => t.type === "loan");

  const visibleItems =
    activeTab === "loan" ? allLoans : byMonth(activeTab);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || parseFloat(form.amount) <= 0) return;
    const tx = {
      id: Date.now(),
      type: form.type,
      amount: parseFloat(form.amount),
      category: form.type === "loan" ? null : form.category,
      description: form.description.trim(),
      date: form.date,
      person: form.type === "loan" ? form.person.trim() : null,
      status: form.type === "loan" ? form.status : null,
    };
    setTransactions((prev) => [...prev, tx]);
    setShowForm(false);
    setForm(EMPTY_FORM);
    setActiveTab(form.type);
  };

  const deleteTransaction = (id) => setTransactions((prev) => prev.filter((t) => t.id !== id));

  const toggleLoanStatus = (id) =>
    setTransactions((prev) =>
      prev.map((t) => t.id === id ? { ...t, status: t.status === "pending" ? "repaid" : "pending" } : t)
    );

  return (
    <div className="screen">
      <div className="screen-header">
        <h2 className="page-title">Budget</h2>
        <button className="btn-icon-round" onClick={() => setShowForm(!showForm)}>
          {showForm ? <IconX size={18} stroke={2} /> : <IconPlus size={18} stroke={2} />}
        </button>
      </div>

      {/* Month nav */}
      <div className="month-nav">
        <button className="btn-ghost" onClick={() => setMonth((m) => addMonths(m, -1))}>
          <IconChevronLeft size={18} stroke={1.5} />
        </button>
        <span className="month-label">{formatYearMonth(month)}</span>
        <button className="btn-ghost" onClick={() => setMonth((m) => addMonths(m, 1))}>
          <IconChevronRight size={18} stroke={1.5} />
        </button>
      </div>

      {/* Monthly summary */}
      <div className="budget-summary">
        <div className={`budget-stat ${balance >= 0 ? "positive" : "negative"}`}>
          <span className="bstat-label">Solde</span>
          <span className="bstat-value">{balance >= 0 ? "+" : ""}{fmtAmount(balance)}</span>
        </div>
        <div className="budget-stat">
          <span className="bstat-label">Revenus</span>
          <span className="bstat-value income">{fmtAmount(monthlyIncome)}</span>
        </div>
        <div className="budget-stat">
          <span className="bstat-label">Dépenses</span>
          <span className="bstat-value expense">{fmtAmount(monthlyExpense)}</span>
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <form className="card budget-form" onSubmit={handleSubmit}>
          <div className="type-selector">
            {["income", "expense", "loan"].map((t) => (
              <button key={t} type="button"
                className={`type-btn ${form.type === t ? "active" : ""}`}
                onClick={() => setForm((f) => ({ ...f, type: t, category: CATEGORIES[t][0] || "" }))}
              >
                {TAB_LABELS[t]}
              </button>
            ))}
          </div>
          <div className="input-grid-2">
            <div className="input-group">
              <label>Montant (€)</label>
              <input type="number" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} placeholder="0" min="0" step="0.01" required />
            </div>
            <div className="input-group">
              <label>Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
            </div>
          </div>

          {form.type !== "loan" && (
            <div className="input-group">
              <label>Catégorie</label>
              <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                {CATEGORIES[form.type].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          )}

          {form.type === "loan" && (
            <>
              <div className="input-group">
                <label>Prêté par</label>
                <input type="text" value={form.person} onChange={(e) => setForm((f) => ({ ...f, person: e.target.value }))} placeholder="Prénom" />
              </div>
              <div className="input-group">
                <label>Statut</label>
                <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
                  <option value="pending">En cours</option>
                  <option value="repaid">Remboursé</option>
                </select>
              </div>
            </>
          )}

          <div className="input-group">
            <label>Description (optionnel)</label>
            <input type="text" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Note..." />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Annuler</button>
            <button type="submit" className="btn-primary">Ajouter</button>
          </div>
        </form>
      )}

      {/* Tabs */}
      <div className="budget-tabs">
        {["income", "expense", "loan"].map((t) => (
          <button key={t} className={`budget-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
            {TAB_LABELS[t]}
            {t !== "loan" && byMonth(t).length > 0 && <span className="tab-count">{byMonth(t).length}</span>}
            {t === "loan" && allLoans.filter(l => l.status === "pending").length > 0 && (
              <span className="tab-count">{allLoans.filter(l => l.status === "pending").length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Transaction list */}
      <div className="transaction-list">
        {visibleItems.length === 0 ? (
          <p className="empty-state-sm">Aucune entrée pour ce mois.</p>
        ) : (
          visibleItems.map((tx) => (
            <div key={tx.id} className={`transaction-row ${tx.type} ${tx.status === "repaid" ? "repaid" : ""}`}>
              <div className="tx-left">
                {tx.type === "loan" && (
                  <button className="loan-status-btn" onClick={() => toggleLoanStatus(tx.id)} title="Changer statut">
                    {tx.status === "repaid" ? <IconCircleCheck size={18} stroke={1.5} /> : <IconClock size={18} stroke={1.5} />}
                  </button>
                )}
                <div className="tx-info">
                  <span className="tx-label">{tx.type === "loan" ? tx.person : (tx.category || tx.description || "—")}</span>
                  {tx.description && tx.type !== "loan" && <span className="tx-desc">{tx.description}</span>}
                  {tx.type === "loan" && tx.description && <span className="tx-desc">{tx.description}</span>}
                  {tx.type === "loan" && (
                    <span className={`loan-badge ${tx.status}`}>{tx.status === "repaid" ? "Remboursé" : "En cours"}</span>
                  )}
                </div>
              </div>
              <div className="tx-right">
                <span className="tx-amount">
                  {tx.type === "income" ? "+" : tx.type === "expense" ? "-" : ""}{fmtAmount(tx.amount)}
                </span>
                <span className="tx-date">{new Date(tx.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })}</span>
                <button className="btn-ghost-sm" onClick={() => deleteTransaction(tx.id)}>
                  <IconTrash size={13} stroke={1.5} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
