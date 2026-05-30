import { supabase } from "./supabase";

// ── Sync Status ──────────────────────────────────────────────────────────────
let _status = "checking";
const _listeners = new Set();

export const syncStatus = {
  get: () => _status,
  set: (s) => {
    if (s === _status) return;
    _status = s;
    _listeners.forEach((cb) => cb(s));
  },
  subscribe: (cb) => {
    _listeners.add(cb);
    return () => _listeners.delete(cb);
  },
};

const ok = () => syncStatus.set("online");
const fail = () => syncStatus.set("offline");

function ls(key, fallback = null) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

// ── body_measurements ────────────────────────────────────────────────────────
export const bodyMeasurements = {
  async getAll(profile) {
    try {
      const { data, error } = await supabase
        .from("body_measurements")
        .select("*")
        .eq("profile", profile)
        .order("week_start");
      if (error) throw error;
      ok();
      return data.map((r) => ({
        weekStart: r.week_start,
        date: r.date,
        weight: r.weight,
        waist: r.waist,
        hips: r.hips,
        arms: r.arms,
        thighs: r.thighs,
      }));
    } catch {
      fail();
      return null; // null = use localStorage
    }
  },

  upsert(profile, entry) {
    supabase.from("body_measurements")
      .upsert(
        { profile, week_start: entry.weekStart, date: entry.date, weight: entry.weight, waist: entry.waist, hips: entry.hips, arms: entry.arms, thighs: entry.thighs },
        { onConflict: "profile,week_start" }
      )
      .then(({ error }) => (error ? fail() : ok()))
      .catch(fail);
  },

  delete(profile, weekStart) {
    supabase.from("body_measurements").delete()
      .eq("profile", profile).eq("week_start", weekStart)
      .then(({ error }) => (error ? fail() : ok()))
      .catch(fail);
  },
};

// ── budget_entries ───────────────────────────────────────────────────────────
export const budgetEntries = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from("budget_entries")
        .select("*")
        .order("date", { ascending: false });
      if (error) throw error;
      ok();
      return data.map((r) => ({
        id: r.id,
        type: r.type,
        amount: r.amount,
        category: r.category,
        description: r.description,
        date: r.date,
        person: r.person,
        status: r.status,
      }));
    } catch {
      fail();
      return null;
    }
  },

  insert(tx) {
    supabase.from("budget_entries").insert({
      id: tx.id, type: tx.type, amount: tx.amount, category: tx.category,
      description: tx.description, date: tx.date, person: tx.person, status: tx.status,
    }).then(({ error }) => (error ? fail() : ok())).catch(fail);
  },

  delete(id) {
    supabase.from("budget_entries").delete().eq("id", id)
      .then(({ error }) => (error ? fail() : ok())).catch(fail);
  },

  updateStatus(id, status) {
    supabase.from("budget_entries").update({ status }).eq("id", id)
      .then(({ error }) => (error ? fail() : ok())).catch(fail);
  },
};

// ── alarms ───────────────────────────────────────────────────────────────────
export const alarmsDb = {
  async getState(profile) {
    try {
      const { data, error } = await supabase
        .from("alarms")
        .select("*")
        .eq("profile", profile);
      if (error) throw error;
      ok();
      const active = {};
      const custom = [];
      data.forEach((row) => {
        if (row.is_active) active[row.id] = true;
        if (row.is_custom) custom.push({ id: row.id, label: row.label, time: row.time, description: row.description });
      });
      return { active, custom };
    } catch {
      fail();
      return null;
    }
  },

  setActive(profile, alarmId, isActive, alarmData = {}) {
    supabase.from("alarms")
      .upsert(
        { id: alarmId, profile, is_active: isActive, label: alarmData.label, time: alarmData.time, description: alarmData.description, is_custom: false },
        { onConflict: "id,profile" }
      )
      .then(({ error }) => (error ? fail() : ok()))
      .catch(fail);
  },

  addCustom(profile, alarm) {
    supabase.from("alarms").insert({
      id: alarm.id, profile, label: alarm.label, time: alarm.time,
      description: alarm.description, is_custom: true, is_active: false,
    }).then(({ error }) => (error ? fail() : ok())).catch(fail);
  },

  deleteCustom(profile, alarmId) {
    supabase.from("alarms").delete().eq("id", alarmId).eq("profile", profile)
      .then(({ error }) => (error ? fail() : ok())).catch(fail);
  },
};

// ── profiles ─────────────────────────────────────────────────────────────────
export const profilesDb = {
  async get(profile) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", profile)
        .single();
      if (error) throw error;
      ok();
      return {
        sportTime: data.sport_time || "morning",
        height: data.height || null,
        targets: data.targets || {},
      };
    } catch {
      fail();
      return null;
    }
  },

  upsert(profile, fields) {
    supabase.from("profiles")
      .upsert({ id: profile, ...fields, updated_at: new Date().toISOString() }, { onConflict: "id" })
      .then(({ error }) => (error ? fail() : ok()))
      .catch(fail);
  },
};

// ── Connectivity check ───────────────────────────────────────────────────────
export async function checkConnection() {
  try {
    const { error } = await supabase.from("profiles").select("id").limit(1);
    error ? fail() : ok();
    return !error;
  } catch {
    fail();
    return false;
  }
}
