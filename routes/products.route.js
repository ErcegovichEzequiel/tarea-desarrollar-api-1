const express = require('express'); // Importamos express
const productsRoute = express.Router(); // Instanciamos express.Router
const products = require('../products/products')

// GET Obtener todos los productos
productsRoute.get('/', (req, res) => {
    res.json(
        {
            result: products,
            status: 200
        }
    )
}
)

// GET Obtener un producto por su id
productsRoute.get('/:id_producto', (req, res) => {
    const { id_producto } = req.params;
    if (!id_producto || isNaN(id_producto)) {
        return res.status(400).json(
            {
                error: 'El id del producto debe ser un numero',
                status: 400
            }
        )
    }
    const productPorID = products.find(products => products.id === parseInt(id_producto));
    if (productPorID) {
        return res.status(200).json(
            {
                product: productPorID,
                status: 200
            }
        )
    }
    else {
        return res.status(404).json(
            {
                message: 'No se encontro el producto con el id ' + id_producto,
                status: 404
            }
        );
    }
}
)

// POST Agregar un producto
productsRoute.post('/', (req, res) => {
    const id = products.length + 1
    const { nombre, precio, descripcion } = req.body;
    if (!nombre || !precio || !descripcion) {
        return res.status(400).json(
            {
                error: 'Todos los campos son obligatorios',
                status: 400
            }
        )
    }
    const nuevoProduct = {
        id,
        nombre,
        precio,
        descripcion
    }
    products.push(nuevoProduct);
    res.status(201).json(nuevoProduct);
    console.log(products);
})

// PUT actualizar un producto
productsRoute.put('/:id', (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).json(
            {
                error: 'El id del producto debe ser un numero',
                status: 400
            }
        )
    }
    const { nombre, precio } = req.body;
    if (!nombre || !precio || isNaN(precio)) {
        return res.status(400).json(
            {
                error: 'Todos los campos son obligatorios',
                status: 400
            }
        )
    }
    const productPorID = products.find(products => products.id === parseInt(id));
    if (productPorID) {
        productPorID.nombre = nombre;
        productPorID.precio = precio;
        res.status(200).json(
            {
                product: productPorID,
                status: 200
            }
        )
            }
    else {
        res.status(404).json(
            {
                message: 'No se encontro el producto con el id ' + id_producto,
                status: 404
            }
        )
    };
    console.log(products);
})
module.exports = { productsRoute }