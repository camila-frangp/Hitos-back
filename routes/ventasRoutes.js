const express = require('express');
const { getVentas, getVenta, postVenta, deleteVenta, putVenta } = require('../controllers/ventasController');
const router = express.Router();

router.get('/ventas', getVentas);
router.get('/ventas/:id', getVenta);
router.post('/ventas', postVenta);
router.delete('/ventas/:id', deleteVenta);
router.put('/ventas/:id', putVenta);

module.exports = router;