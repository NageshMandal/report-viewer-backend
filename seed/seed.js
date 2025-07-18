const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const db = new sqlite3.Database('./db/db.sqlite');

// ⬇️ Load and execute schema.sql
const schema = fs.readFileSync(path.join(__dirname, '../db/schema.sql'), 'utf-8');
db.exec(schema);

const reports = JSON.parse(fs.readFileSync(path.join(__dirname, 'reports.json'), 'utf-8'));

db.serialize(() => {
  db.run('DELETE FROM reports');
  db.run('DELETE FROM feedback');

  const stmt = db.prepare(`
    INSERT INTO reports (title, summary, reportType, industry, confidenceScore, sources)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const r of reports) {
    stmt.run(r.title, r.summary, r.reportType, r.industry, r.confidenceScore, JSON.stringify(r.sources));
  }

  stmt.finalize();

  db.run("INSERT OR IGNORE INTO users (email, role) VALUES ('admin@pn.ai', 'admin')");
  console.log('✅ Seed complete.');
});
