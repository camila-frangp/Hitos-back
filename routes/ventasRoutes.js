const express = require('express');
const router = express.Router();
const {
    obtenerVentasController,
    obtenerVentaController,
    agregarVentaController,
    borrarVentaController,
    actualizarVentaController
} = require('../controllers/ventasController');

router.get('/ventas', obtenerVentasController);
router.get('/ventas/:id', obtenerVentaController);
router.post('/ventas', agregarVentaController);
router.delete('/ventas/:id', borrarVentaController);
router.put('/ventas/:id', actualizarVentaController);

module.exports = router;
