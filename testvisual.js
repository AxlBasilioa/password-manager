const { db } = require('./config/db');

const queryDatabase = () => {
  const stmt = db.prepare('SELECT * FROM passwords');
  const rows = stmt.all();

  rows.forEach(row => {
    console.log(row);
  });
};

queryDatabase();
