const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/db.sqlite');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      role TEXT CHECK(role IN ('viewer', 'reviewer', 'admin')) NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      summary TEXT,
      reportType TEXT,
      industry TEXT,
      confidenceScore REAL,
      sources TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reportId INTEGER,
      userComment TEXT,
      flaggedSection TEXT
    )
  `);

  console.log('✅ Migration complete. Tables created.');
});
