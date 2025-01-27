const { obtenerVentas, obtenerVenta, agregarVenta, borrarVenta, actualizarVenta } = require('../models/ventasModel');

const getVentas = async (req, res) => {
  try {
    const ventas = await obtenerVentas();
    res.json(ventas);
  } catch (err) {
    res.status(500).send('No se pudieron obtener las ventas');
  }
}

const getVenta = async (req, res) => {
  try {
    const venta = await obtenerVenta(req.params.id);
    res.json(venta);
  } catch (err) {
    res.status(500).send('No se pudo obtener la venta');
  }
}

const postVenta = async (req, res) => {
  try {
    const venta = await agregarVenta(req.body);
    res.json(venta);
  } catch (err) {
    res.status(500).send('No se pudo agregar la venta');
  }
}

const deleteVenta = async (req, res) => {
  try {
    await borrarVenta(req.params.id);
    res.send('Venta borrada');
  } catch (err) {
    res.status(500).send('No se pudo borrar la venta');
  }
}

const putVenta = async (req, res) => {
  try {
    const venta = await actualizarVenta(req.params.id, req.body);
    res.json(venta);
  } catch (err) {
    res.status(500).send('No se pudo actualizar la venta');
  }
}

module.exports = {
  getVentas,
  getVenta,
  postVenta,
  deleteVenta,
  putVenta
};