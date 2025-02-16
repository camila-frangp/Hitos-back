const express = require('express');
const bodyParser = require('body-parser');
const { logRequest, errorHandler } = require('./middlewares/middleware');
const { obtenerVentas, obtenerVenta, agregarVenta, borrarVenta, actualizarVenta } = require('./models/ventasModel');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(logRequest);
app.use(errorHandler);

app.get('/ventas', async (req, res) => {
  const ventas = await obtenerVentas();
  res.json(ventas);
});

app.get('/ventas/:id', async (req, res) => {
  const venta = await obtenerVenta(req.params.id);
  if (venta) {
    res.json(venta);
  } else {
    res.status(404).send('Venta no encontrada');
  }
});

app.post('/ventas', async (req, res) => {
  const nuevaVenta = await agregarVenta(req.body);
  res.status(201).json(nuevaVenta);
});

app.put('/ventas/:id', async (req, res) => {
  const ventaActualizada = await actualizarVenta(req.params.id, req.body);
  if (ventaActualizada) {
    res.json(ventaActualizada);
  } else {
    res.status(404).send('Venta no encontrada');
  }
});

app.delete('/ventas/:id', async (req, res) => {
  const resultado = await borrarVenta(req.params.id);
  if (resultado) {
    res.status(204).send();
  } else {
    res.status(404).send('Venta no encontrada');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});