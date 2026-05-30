-- FitCouple — Supabase Schema
-- Run this in the Supabase SQL editor (Dashboard > SQL Editor > New query)

CREATE TABLE IF NOT EXISTS body_measurements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile TEXT NOT NULL,
  week_start DATE NOT NULL,
  date TIMESTAMPTZ DEFAULT NOW(),
  weight NUMERIC,
  waist NUMERIC,
  hips NUMERIC,
  arms NUMERIC,
  thighs NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile, week_start)
);

CREATE TABLE IF NOT EXISTS budget_entries (
  id BIGINT PRIMARY KEY,
  type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  category TEXT,
  description TEXT,
  date DATE NOT NULL,
  person TEXT,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alarms (
  id TEXT NOT NULL,
  profile TEXT NOT NULL,
  label TEXT,
  time TEXT,
  description TEXT,
  is_custom BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id, profile)
);

CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  sport_time TEXT DEFAULT 'morning',
  height NUMERIC,
  targets JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS for personal use (no authentication)
ALTER TABLE body_measurements DISABLE ROW LEVEL SECURITY;
ALTER TABLE budget_entries DISABLE ROW LEVEL SECURITY;
ALTER TABLE alarms DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
