var express = require('express');

const {
    newBook
} = require('../controllers/BookController');


var router = express.Router();
router.use(express.json()); //express body parser



router.post('/', newBook);



module.exports = router;