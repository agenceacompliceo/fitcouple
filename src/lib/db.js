import { supabase } from "./supabase";

// ── Sync Status ───────────────────────────────────────────────────────────────
let _status = "checking";
const _listeners = new Set();

export const syncStatus = {
  get: () => _status,
  set: (s) => {
    if (s === _status) return;
    _status = s;
    console.log(`[sync] status → ${s}`);
    _listeners.forEach((cb) => cb(s));
  },
  subscribe: (cb) => {
    _listeners.add(cb);
    return () => _listeners.delete(cb);
  },
};

const ok = () => syncStatus.set("online");
const fail = (ctx, err) => {
  console.error(`[db] ${ctx} failed:`, err?.message ?? err);
  syncStatus.set("offline");
};

// ── body_measurements ─────────────────────────────────────────────────────────
// DB columns : poids, tour_taille, tour_hanches, tour_bras, tour_cuisses
// App fields : weight, waist,      hips,         arms,      thighs
export const bodyMeasurements = {
  async getAll(profile) {
    console.log(`[db] body_measurements: fetching profile=${profile}`);
    try {
      const { data, error } = await supabase
        .from("body_measurements")
        .select("*")
        .eq("profile", profile)
        .order("week_start");
      if (error) throw error;
      ok();
      console.log(`[db] body_measurements: got ${data.length} rows`);
      return data.map((r) => ({
        weekStart: r.week_start,
        date: r.date,
        weight:  r.poids,
        waist:   r.tour_taille,
        hips:    r.tour_hanches,
        arms:    r.tour_bras,
        thighs:  r.tour_cuisses,
      }));
    } catch (err) {
      fail("body_measurements.getAll", err);
      return null;
    }
  },

  upsert(profile, entry) {
    console.log(`[db] body_measurements: upsert week=${entry.weekStart} profile=${profile}`);
    supabase.from("body_measurements")
      .upsert(
        {
          profile,
          week_start:   entry.weekStart,
          date:         entry.date,
          poids:        entry.weight,
          tour_taille:  entry.waist,
          tour_hanches: entry.hips,
          tour_bras:    entry.arms,
          tour_cuisses: entry.thighs,
        },
        { onConflict: "profile,week_start" }
      )
      .then(({ error }) => {
        if (error) { fail("body_measurements.upsert", error); return; }
        console.log("[db] body_measurements: upsert ok");
        ok();
      })
      .catch((err) => fail("body_measurements.upsert", err));
  },

  delete(profile, weekStart) {
    console.log(`[db] body_measurements: delete week=${weekStart} profile=${profile}`);
    supabase.from("body_measurements").delete()
      .eq("profile", profile).eq("week_start", weekStart)
      .then(({ error }) => {
        if (error) { fail("body_measurements.delete", error); return; }
        console.log("[db] body_measurements: delete ok");
        ok();
      })
      .catch((err) => fail("body_measurements.delete", err));
  },
};

// ── budget_entries ────────────────────────────────────────────────────────────
// DB columns : montant, categorie, pret_personne, pret_statut, type=revenu/depense/pret
// App fields : amount,  category,  person,        status,      type=income/expense/loan

const BUDGET_TYPE_TO_DB   = { income: "revenu", expense: "depense", loan: "pret" };
const BUDGET_TYPE_FROM_DB = { revenu: "income", depense: "expense", pret: "loan" };

function mapBudgetRow(r) {
  return {
    id:          r.id,
    type:        BUDGET_TYPE_FROM_DB[r.type] ?? r.type,
    amount:      r.montant,
    category:    r.categorie,
    description: r.description,
    date:        r.date,
    person:      r.pret_personne,
    status:      r.pret_statut,
  };
}

export const budgetEntries = {
  async getAll() {
    console.log("[db] budget_entries: fetching all");
    try {
      const { data, error } = await supabase
        .from("budget_entries")
        .select("*")
        .order("date", { ascending: false });
      if (error) throw error;
      ok();
      console.log(`[db] budget_entries: got ${data.length} rows`);
      return data.map(mapBudgetRow);
    } catch (err) {
      fail("budget_entries.getAll", err);
      return null;
    }
  },

  async insert(tx) {
    console.log(`[db] budget_entries: insert type=${tx.type} amount=${tx.amount}`);
    try {
      const { data, error } = await supabase.from("budget_entries")
        .insert({
          // id omitted — Supabase generates UUID via gen_random_uuid()
          type:          BUDGET_TYPE_TO_DB[tx.type] ?? tx.type,
          montant:       tx.amount,
          categorie:     tx.category,
          description:   tx.description,
          date:          tx.date,
          pret_personne: tx.person,
          pret_statut:   tx.status,
        })
        .select("id")
        .single();
      if (error) throw error;
      console.log("[db] budget_entries: insert ok, server id=", data.id);
      ok();
      return data.id;
    } catch (err) {
      fail("budget_entries.insert", err);
      return null;
    }
  },

  delete(id) {
    console.log(`[db] budget_entries: delete id=${id}`);
    supabase.from("budget_entries").delete().eq("id", id)
      .then(({ error }) => {
        if (error) { fail("budget_entries.delete", error); return; }
        console.log("[db] budget_entries: delete ok");
        ok();
      })
      .catch((err) => fail("budget_entries.delete", err));
  },

  updateStatus(id, status) {
    console.log(`[db] budget_entries: updateStatus id=${id} → ${status}`);
    supabase.from("budget_entries").update({ pret_statut: status }).eq("id", id)
      .then(({ error }) => {
        if (error) { fail("budget_entries.updateStatus", error); return; }
        console.log("[db] budget_entries: updateStatus ok");
        ok();
      })
      .catch((err) => fail("budget_entries.updateStatus", err));
  },

  // Callback receives already-mapped app objects (not raw DB rows)
  subscribe(callback) {
    console.log("[db] budget_entries: subscribing to real-time");
    const channel = supabase
      .channel("budget-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "budget_entries" },
        (payload) => {
          console.log(`[db] budget_entries: realtime ${payload.eventType}`, payload.new ?? payload.old);
          callback({
            eventType: payload.eventType,
            new: payload.new ? mapBudgetRow(payload.new) : null,
            old: payload.old ?? null,
          });
        }
      )
      .subscribe((status) => {
        console.log(`[db] budget_entries: channel status=${status}`);
        if (status === "SUBSCRIBED") ok();
      });
    return () => {
      console.log("[db] budget_entries: unsubscribing");
      supabase.removeChannel(channel);
    };
  },
};

// ── alarms ────────────────────────────────────────────────────────────────────
// DB columns : profile_id, enabled (not is_active), is_custom
export const alarmsDb = {
  async getState(profile) {
    console.log(`[db] alarms: fetching profile_id=${profile}`);
    try {
      const { data, error } = await supabase
        .from("alarms")
        .select("*")
        .eq("profile_id", profile);
      if (error) throw error;
      ok();
      console.log(`[db] alarms: got ${data.length} rows`);
      const active = {};
      const custom = [];
      data.forEach((row) => {
        if (row.enabled) active[row.id] = true;
        if (row.is_custom) custom.push({ id: row.id, label: row.label, time: row.time, description: row.description });
      });
      return { active, custom };
    } catch (err) {
      fail("alarms.getState", err);
      return null;
    }
  },

  setActive(profile, alarmId, isActive, alarmData = {}) {
    console.log(`[db] alarms: setActive profile_id=${profile} id=${alarmId} enabled=${isActive}`);
    supabase.from("alarms")
      .upsert(
        { id: alarmId, profile_id: profile, enabled: isActive, label: alarmData.label, time: alarmData.time, description: alarmData.description, is_custom: false },
        { onConflict: "id,profile_id" }
      )
      .then(({ error }) => {
        if (error) { fail("alarms.setActive", error); return; }
        console.log("[db] alarms: setActive ok");
        ok();
      })
      .catch((err) => fail("alarms.setActive", err));
  },

  async addCustom(profile, alarm) {
    console.log(`[db] alarms: addCustom profile_id=${profile}`);
    try {
      const { data, error } = await supabase.from("alarms")
        .insert({
          // id omitted — Supabase generates UUID
          profile_id:  profile,
          label:       alarm.label,
          time:        alarm.time,
          description: alarm.description,
          is_custom:   true,
          enabled:     false,
        })
        .select("id")
        .single();
      if (error) throw error;
      console.log("[db] alarms: addCustom ok, server id=", data.id);
      ok();
      return data.id;
    } catch (err) {
      fail("alarms.addCustom", err);
      return null;
    }
  },

  deleteCustom(profile, alarmId) {
    console.log(`[db] alarms: deleteCustom profile_id=${profile} id=${alarmId}`);
    supabase.from("alarms").delete().eq("id", alarmId).eq("profile_id", profile)
      .then(({ error }) => {
        if (error) { fail("alarms.deleteCustom", error); return; }
        console.log("[db] alarms: deleteCustom ok");
        ok();
      })
      .catch((err) => fail("alarms.deleteCustom", err));
  },
};

// ── profiles ──────────────────────────────────────────────────────────────────
export const profilesDb = {
  async ensureExists() {
    console.log("[db] profiles: ensuring adam & andrea exist");
    try {
      const { error } = await supabase.from("profiles")
        .upsert(
          [{ id: "adam" }, { id: "andrea" }],
          { onConflict: "id", ignoreDuplicates: true }
        );
      if (error) throw error;
      console.log("[db] profiles: ensureExists ok");
      ok();
    } catch (err) {
      fail("profiles.ensureExists", err);
    }
  },

  async get(profile) {
    console.log(`[db] profiles: fetching id=${profile}`);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", profile)
        .single();
      if (error) throw error;
      ok();
      console.log(`[db] profiles: fetched`, { sportTime: data.sport_time, height: data.height });
      return {
        sportTime: data.sport_time || "morning",
        height:    data.height || null,
        targets:   data.targets || {},
      };
    } catch (err) {
      fail("profiles.get", err);
      return null;
    }
  },

  upsert(profile, fields) {
    console.log(`[db] profiles: upsert id=${profile}`, fields);
    supabase.from("profiles")
      .upsert({ id: profile, ...fields, updated_at: new Date().toISOString() }, { onConflict: "id" })
      .then(({ error }) => {
        if (error) { fail("profiles.upsert", error); return; }
        console.log("[db] profiles: upsert ok");
        ok();
      })
      .catch((err) => fail("profiles.upsert", err));
  },
};

// ── Connectivity check ────────────────────────────────────────────────────────
export async function checkConnection() {
  console.log("[db] checkConnection: pinging Supabase");
  try {
    const { error } = await supabase.from("profiles").select("id").limit(1);
    if (error) throw error;
    console.log("[db] checkConnection: online");
    ok();
    return true;
  } catch (err) {
    fail("checkConnection", err);
    return false;
  }
}
