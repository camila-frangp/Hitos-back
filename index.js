const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();
const ventasRoutes = require('./routes/ventasRoutes');
const userRoutes = require('./routes/userRoutes');
const fs = require('fs');
const jwt = require('jsonwebtoken');

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.listen(3001, console.log("¡Servidor encendido!"));

// Base de datos simulada de usuarios
const users = [];

// Middleware de autenticación
const SECRET_KEY = '123456';
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    console.log('Token no proporcionado');
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log('Error de verificación de token:', err.message);
      return res.sendStatus(403);
    }
    req.user = user;
    console.log('Token verificado para el usuario:', user.username);
    next();
  });
}

// Ruta para registrarse
app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  users.push({ username, password });
  res.status(201).send('Usuario registrado');
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Credenciales inválidas');
  }
});

app.use(authenticateToken);
app.use('/ventas', ventasRoutes);
app.use('/api/users', userRoutes);