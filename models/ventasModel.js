const Venta = require('./Venta');

const obtenerVentas = async () => {
  return await Venta.findAll();
}

const obtenerVenta = async (id) => {
  return await Venta.findByPk(id);
}

const agregarVenta = async (venta) => {
  return await Venta.create(venta);
}

const borrarVenta = async (id) => {
  const venta = await Venta.findByPk(id);
  if (venta) {
    await venta.destroy();
    return true;
  }
  return false;
}

const actualizarVenta = async (id, venta) => {
  const ventaExistente = await Venta.findByPk(id);
  if (ventaExistente) {
    return await ventaExistente.update(venta);
  }
  return null;
}

module.exports = {
  obtenerVentas,
  obtenerVenta,
  agregarVenta,
  borrarVenta,
  actualizarVenta
}