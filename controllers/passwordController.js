const bcrypt = require('bcryptjs');
const Password = require('../models/Password');

const addPassword = async (req, res) => {
  const { service, username, password } = req.body;

  if (!service || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const pepper = process.env.PEPPER;
  const passwordWithPepper = password + pepper;

  const hashedPassword = await bcrypt.hash(passwordWithPepper, 10);
  Password.addPassword(service, username, hashedPassword);

  res.status(201).json({ message: 'Password added successfully!' });
};

const getPassword = (req, res) => {
  const { service } = req.params;

  const passwordEntry = Password.getPasswordByService(service);

  if (passwordEntry) {
    res.status(200).json(passwordEntry);
  } else {
    res.status(404).json({ message: 'Service not found' });
  }
};

const listPasswords = (req, res) => {
  const allPasswords = Password.listPasswords();
  res.status(200).json(allPasswords);
};

const verifyPasswordEndpoint = async (req, res) => {
  const { service, username, password } = req.body;

  if (!service || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const passwordEntry = Password.getPasswordByService(service);

  if (!passwordEntry || passwordEntry.username !== username) {
    return res.status(404).json({ message: 'Service or username not found' });
  }

  const isMatch = await verifyPassword(password, passwordEntry.password);

  if (isMatch) {
    res.status(200).json({ message: 'Password is correct' });
  } else {
    res.status(401).json({ message: 'Incorrect password' });
  }
};

const verifyPassword = async (enteredPassword, storedHashedPassword) => {
  const pepper = process.env.PEPPER;
  const passwordWithPepper = enteredPassword + pepper;

  const isMatch = await bcrypt.compare(passwordWithPepper, storedHashedPassword);
  return isMatch;
};

module.exports = { addPassword, getPassword, listPasswords, verifyPasswordEndpoint };
