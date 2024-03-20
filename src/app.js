const express = require('express');
const ProductManager = require('./products03');

const app = express();
const PORT = 8080;

const manager = new ProductManager(`products.json`);

app.get('/products', async (req, res) => {
  try {
    const products = await manager.getProducts();
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener productos');
  }
});

app.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await manager.getProductById(productId);
    product ? res.send(product) : res.status(404).send('Producto no encontrado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener producto');
  }
});

app.post('/products', async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;

  try {
    const product = await manager.addProduct(title, description, price, thumbnail, code, stock);
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar producto');
  }
});




// import express from 'express';
// import ProductManager from './products03';

// const app = express();
// const PORT = 8080; 

// const manager = new ProductManager(`products.json`); 


// app.get('/products', async (request, response) => {
//     let products = await manager.getProducts();
//     const {limit} = request.query;

//     if(limit){
//         products = products.slice(0, limit);
//     }

//     response.send(products);
// });

// app.get('/products/:productId', async (request, response) => {
//     const productId = request.params.productId;

//     let product = await manager.getProductById(productId);

//     product ? response.send(product) : console.error('Producto no encontrado');

// })


// app.listen(PORT, () => {
//     console.log(`Servidor activo en http://localhost:${PORT}`);
// })  