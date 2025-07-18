CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK(role IN ('viewer', 'reviewer', 'admin')) NOT NULL
);

CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  summary TEXT,
  reportType TEXT,
  industry TEXT,
  confidenceScore REAL,
  sources TEXT
);

CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reportId INTEGER,
  userComment TEXT,
  flaggedSection TEXT
);
