CREATE TABLE ventas (
    id serial PRIMARY KEY,
    fecha DATE NOT NULL,
    cliente_id INT NOT NULL,
    cliente VARCHAR(100) NOT NULL,
    monto_venta DECIMAL(10, 2) NOT NULL
);

CREATE TABLE devoluciones (
    id serial PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    fecha DATE NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES ventas(id)
);

CREATE TABLE productos (
    id serial PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    cantidad INT NOT NULL
);