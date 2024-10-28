CREATE DATABASE panaderia_db;
USE panaderia_db;

CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);

INSERT INTO productos (nombre, descripcion, precio, stock) VALUES
('Pan de Muerto', 'Un pan tradicional mexicano, suave y esponjoso, adornado con un glaseado dulce y espolvoreado con azúcar. Este pan se elabora especialmente para la celebración del Día de Muertos, simbolizando el ciclo de la vida y la muerte.', 20.00, 50),
('Concha', 'Un pan dulce con una cobertura crujiente. Ideal para el desayuno.', 15.00, 100),
('Dona', 'Un postre frito y dulce, cubierto con glaseado.', 15.00, 100),
('Polvorón', 'Un dulce desmenuzable y delicioso que se derrite en la boca.', 15.00, 100),
('Pan Blanco', 'Un pan básico, suave y ligero, ideal para cualquier ocasión. Su miga es esponjosa y su corteza dorada, lo que lo hace perfecto para sandwiches o tostadas.', 30.00, 75);

	


select*from productos

DROP DATABASE panaderia_db