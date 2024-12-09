const express = require('express')
const app = express()
const fs = require('fs')
const jwt = require('jsonwebtoken');
const {pruebas, obtenerVenta, agregarVenta} = require('./consultas.js')

app.listen(3001, console.log("¡Servidor encendido!"))

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
  const username = req.body;
  const password = req.body;
  users.push({ username, password });
  res.status(201).send('Usuario registrado');
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const username = req.body;
  const password = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Credenciales inválidas');
  }
});

app.get("/ventas", authenticateToken, (req, res) => {
    const ventas = JSON.parse(fs.readFileSync("./ventas/ventas.json"))
    res.json(ventas)
})

app.get("/devoluciones", authenticateToken, (req, res) => {
    const devoluciones = JSON.parse(fs.readFileSync("./ventas/devoluciones.json"))
    res.json(devoluciones)
})

app.get("/pruebas", (req, res) => {
    pruebas()
    res.send("Pruebas realizadas")
});


app.get("/obtener-ventas/:id", (req, res) => {
  obtenerVenta(req.params.id)
  .then(venta => res.json(venta))
  .catch(err => res.status(500).send('No se pudo obtener la venta'))
});

app.post("/agregar-venta", (req, res) => {
  agregarVenta(req.body)
  .then(venta => res.json(venta))
  .catch(err => res.status(500).send('No se pudo agregar la venta'))
});

app.delete("/borrar-venta/:id", (req, res) => {
  borrarVenta(req.params.id)
  .then(() => res.send("Venta borrada"))
  .catch(err => res.status(500).send('No se pudo borrar la venta'))
});

app.put("/actualizar-venta/:id", (req, res) => {
  actualizarVenta(req.params.id, req.body)
  .then(venta => res.json(venta))
  .catch(err => res.status(500).send('No se pudo actualizar la venta'))
});
