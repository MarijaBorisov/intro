var express = require('express');
var router = express.Router();
var sc = require('../components/products/productsFunctions').productComponents;

//MySQLS

 
router.get('/all', sc.getAllProducts);
router.get('/:id', sc.getProductPageById);
router.post('/add', sc.createProduct);
router.delete('/remove/:id', sc.removeProductById);
router.put('/update', sc.updateProduct);

module.exports = router;