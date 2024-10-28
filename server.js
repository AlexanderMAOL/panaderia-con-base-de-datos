//node server.js
//node app.js


const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Sigmma0312+', 
    database: 'panaderia_db'
});


db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.post('/comprar', (req, res) => {
    const { id_producto, cantidad } = req.body;

    db.query('SELECT stock FROM productos WHERE id_producto = ?', [id_producto], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const stockActual = results[0].stock;

            if (cantidad > stockActual) {
                return res.json({ message: 'No hay suficiente stock disponible', stockActual });
            }

            const nuevoStock = stockActual - cantidad;

            db.query('UPDATE productos SET stock = ? WHERE id_producto = ?', [nuevoStock, id_producto], (err) => {
                if (err) throw err;

                return res.json({ message: 'Compra realizada con éxito', nuevoStock });
            });
        } else {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
