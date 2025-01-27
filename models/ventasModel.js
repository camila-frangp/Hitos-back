const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'ventas',
    password: 'lucas269',
    allowExitOnIdle: true
});

const obtenerVentas = async () => {
    const client = await pool.connect();
    const { rows } = await client.query('SELECT * FROM ventas');
    client.release();
    return rows;
}

const obtenerVenta = async (id) => {
    const consulta = 'SELECT * FROM ventas WHERE id = $1';
    const values = [id];
    try {
        const { rows } = await pool.query(consulta, values);
        return rows[0];
    } catch (err) {
        console.error('Error al obtener la venta.');
        throw err;
    }
}

const agregarVenta = async (venta) => {
    const consulta = 'INSERT INTO ventas (fecha, monto_venta, cliente_id, productos) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [venta.fecha, venta.monto_venta, venta.cliente_id, cliente, venta.productos];
    try {
        const { rows } = await pool.query(consulta, values);
        return rows[0];
    } catch (err) {
        console.error('Error al agregar la venta.');
        throw err;
    }
}

const borrarVenta = async (id) => {
    const consulta = 'DELETE FROM ventas WHERE id = $1';
    const values = [id];
    try {
        await pool.query(consulta, values);
        return true;
    } catch (err) {
        console.error('Error al borrar la venta.');
        throw err;
    }
}

const actualizarVenta = async ({id, venta}) => {
    const consulta = 'UPDATE ventas SET fecha = $1, monto-venta = $2, cliente-id = $3, productos = $4 WHERE id = $5 RETURNING *';
    const values = [venta.fecha, venta.montoVenta, venta.clienteId, venta.productos, id];
    try {
        const { rows } = await pool.query(consulta, values);
        return rows[0];
    } catch (err) {
        console.error('Error al actualizar la venta.');
        throw err;
    }
}

module.exports = {
    obtenerVentas,
    obtenerVenta,
    agregarVenta,
    borrarVenta,
    actualizarVenta
};
