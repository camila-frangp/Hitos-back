const express = require('express');
const { getVentas, getVenta, postVenta, deleteVenta, putVenta } = require('../controllers/ventasController');
const { logRequest, errorHandler, messageFormatter } = require('../middlewares/middleware');
const router = express.Router();

// Middleware a nivel de router
router.use(logRequest);
router.use(messageFormatter);

router.get('/ventas', (req, res) => {
  const ventas = getVentas();
  res.json(res.formatMessage('Ventas obtenidas con éxito', ventas));
});

router.get('/ventas/:id', (req, res) => {
  const venta = getVenta(req.params.id);
  res.json(res.formatMessage('Venta obtenida con éxito', venta));
});

router.post('/ventas', (req, res) => {
  const nuevaVenta = postVenta(req.body);
  res.json(res.formatMessage('Venta creada con éxito', nuevaVenta));
});

router.delete('/ventas/:id', (req, res) => {
  deleteVenta(req.params.id);
  res.json(res.formatMessage('Venta eliminada con éxito'));
});

router.put('/ventas/:id', (req, res) => {
  const ventaActualizada = putVenta(req.params.id, req.body);
  res.json(res.formatMessage('Venta actualizada con éxito', ventaActualizada));
});

// Middleware de manejo de errores a nivel de router
router.use(errorHandler);

module.exports = router;