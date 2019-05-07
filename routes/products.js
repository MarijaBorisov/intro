var express = require('express');
var router = express.Router();
var sc = require('../components/products/productsFunctions').productComponents;

//MySQLS

router.get('/:id', sc.getProductPageById); 
router.get('/all', sc.getAllProducts);
router.post('/add', sc.createProduct);
router.delete('/remove/:id', sc.removeProductById);
router.post('/update', sc.updateProduct);

module.exports = router;