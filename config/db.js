const Database = require('better-sqlite3');

const db = new Database('passwords.db');

const createTable = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS passwords (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `);
};

module.exports = { db, createTable };
