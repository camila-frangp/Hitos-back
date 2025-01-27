const {
    obtenerVentas,
    obtenerVenta,
    agregarVenta,
    borrarVenta,
    actualizarVenta
} = require('../models/ventasModel');

const obtenerVentasController = async (req, res) => {
    try {
        const ventas = await obtenerVentas();
        res.json(ventas);
    } catch (err) {
        res.status(500).send('Error al obtener las ventas');
    }
}

const obtenerVentaController = async (req, res) => {
    const { id } = req.params;
    try {
        const venta = await obtenerVenta(id);
        res.json(venta);
    } catch (err) {
        res.status(500).send('Error al obtener la venta');
    }
}

const agregarVentaController = async (req, res) => {
    const venta = req.body;
    try {
        const nuevaVenta = await agregarVenta(venta);
        res.json(nuevaVenta);
    } catch (err) {
        res.status(500).send('Error al agregar la venta');
    }
}

const borrarVentaController = async (req, res) => {
    const { id } = req.params;
    try {
        await borrarVenta(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send('Error al borrar la venta');
    }
}

const actualizarVentaController = async (req, res) => {
    const { id } = req.params;
    const venta = req.body;
    try {
        const ventaActualizada = await actualizarVenta({ id, venta });
        res.json(ventaActualizada);
    } catch (err) {
        res.status(500).send('Error al actualizar la venta');
    }
}

module.exports = {
    obtenerVentasController,
    obtenerVentaController,
    agregarVentaController,
    borrarVentaController,
    actualizarVentaController
};
