const express = require('express');
const router = express.Router();
const productService = require('../utils/functions');
const productServiceSequelize = require('../utils/productFunctions').productComponents;


// MSQL
// router.get("/all", productService.getAllProductsMYSQL);
// router.get("/findByID", productService.findProductMYSQL);
// router.post('/products', productService.createProductMYSQL);
// router.post('/updateProduct', productService.updateProductMYSQL);
// router.delete('/products', productService.removeProductMYSQL);


//Sequelize
router.get("/all", productServiceSequelize.getAllProducts);
router.get("/findByID", productServiceSequelize.getProductById);
router.post('/products', productServiceSequelize.createProduct);
router.post('/updateProduct', productServiceSequelize.updateProduct);
router.delete('/products', productServiceSequelize.removeProductById);
module.exports = router;