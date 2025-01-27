const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Venta = sequelize.define('Venta', {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  monto_venta: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productos: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  tableName: 'ventas',
  timestamps: false
});

module.exports = Venta;