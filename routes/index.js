var express = require('express');
var router = express.Router();
const functions = require('../utils/functions')
const mysqlfunctions = require('../utils/mysqlfunctions')
const checkAuth = require('../utils/auth');


router.post('/login',functions.Login);
router.post('/signup',functions.signUpUser);
router.get('/singernames', functions.getSingerNames );
router.get('/singernot', functions.getSingerNotEqualTo);
router.get('/singerage', functions.getSumOfAge);
router.get('/singerlast', functions.getLastTwoSingers);
router.get('/singerone', functions.getSingerEqualTo);
router.get('/singerblank', functions.getSingerBlankName);
router.get('/singers', functions.getAllSingers );
router.get('/timezone', functions.getTimeZone );
router.get('/subtract', functions.getSubtract );
router.get('/subtractage', functions.getSubtractAge );
router.get('/year', functions.getYear );
router.get('/singers/:name', functions.getSingerByName);
router.delete('/singers/:name', functions.deleteSingerByID);
router.post('/singers',functions.createSinger); //removed checkAuth 
router.put('/singers', functions.updateSinger);

router.get("/users", functions.getAllUsers);
router.post('/users', functions.createUser);

router.get("/productid", mysqlfunctions.getProductById);
router.get("/products", mysqlfunctions.getProducts);
router.post('/product', mysqlfunctions.createProduct);


module.exports = router;
