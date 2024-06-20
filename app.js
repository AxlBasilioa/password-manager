const express = require('express');
const { createTable } = require('./config/db');
const passwordRoutes = require('./routes/passwordRoutes');
const authMiddleware = require('./middlewares/auth');
require('dotenv').config();

const app = express();

// Crear tabla si no existe
createTable();

// Middlewares
app.use(express.json());

// Rutas protegidas por autenticación
app.use('/api', authMiddleware, passwordRoutes);

app.listen(3000, () => {
  console.log('Password Manager running on http://localhost:3000');
});
