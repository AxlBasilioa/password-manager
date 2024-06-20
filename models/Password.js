const { db } = require('../config/db');

const addPassword = (service, username, hashedPassword) => {
  const stmt = db.prepare('INSERT INTO passwords (service, username, password) VALUES (?, ?, ?)');
  return stmt.run(service, username, hashedPassword);
};

const getPasswordByService = (service) => {
  const stmt = db.prepare('SELECT * FROM passwords WHERE service = ?');
  return stmt.get(service);
};

const listPasswords = () => {
  const stmt = db.prepare('SELECT service, username FROM passwords');
  return stmt.all();
};

module.exports = { addPassword, getPasswordByService, listPasswords };
