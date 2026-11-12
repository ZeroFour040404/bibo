CREATE TABLE IF NOT EXISTS families (
  id TEXT PRIMARY KEY,
  family_code TEXT UNIQUE NOT NULL,
  kid_name TEXT NOT NULL,
  pin_hash TEXT NOT NULL,
  pin_salt TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  family_id TEXT NOT NULL REFERENCES families(id),
  title TEXT NOT NULL,
  icon TEXT NOT NULL,
  minutes INTEGER NOT NULL,
  points INTEGER NOT NULL,
  status TEXT NOT NULL,
  started_at INTEGER,
  submitted_at INTEGER,
  decided_at INTEGER,
  photo_file TEXT,
  reject_note TEXT,
  reject_count INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);