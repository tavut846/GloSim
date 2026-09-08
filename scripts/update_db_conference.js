const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'backend', '.tmp', 'data.db');
const db = new Database(dbPath);

const stmt = db.prepare(`
  UPDATE conferences 
  SET edition = '第十届年会', 
      location = '中国 · 杭州', 
      venue = '杭州市北京航空航天大学国际创新研究院', 
      start_date = '2026-11-13', 
      end_date = '2026-11-16' 
  WHERE id = 1
`);

const info = stmt.run();
console.log('Rows updated:', info.changes);

const row = db.prepare('SELECT id, title, edition, start_date, end_date, location, venue FROM conferences WHERE id = 1').get();
console.log('Updated conference id 1:', row);
