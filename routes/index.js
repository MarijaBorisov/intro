var express = require('express');
var router = express.Router();
const functions = require('../utils/functions')
const mysqlfunctions = require('../utils/mysqlfunctions')
const checkAuth = require('../utils/auth');


router.post('/login',functions.Login);
router.post('/signup',functions.signUpUser);
router.get('/singernames', functions.getSingerNames );
router.get('/singernot', functions.getSingerNotEqualTo);
router.get('/singerblank', functions.getSingerBlankName);
router.get('/singers', functions.getAllSingers );
router.get('/singers/:name', functions.getSingerByName);
router.delete('/singers/:name', functions.deleteSingerByID);
router.post('/singers',checkAuth,functions.createSinger);
router.put('/singers', functions.updateSinger);

router.get("/users", functions.getAllUsers);
router.post('/users', functions.createUser);

router.get("/productid", mysqlfunctions.getProductById);
router.get("/products", mysqlfunctions.getProducts);
router.post('/product', mysqlfunctions.createProduct);


module.exports = router;
