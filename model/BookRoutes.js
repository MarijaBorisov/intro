var express = require('express');

const {
    newBook
} = require('./BookController');


var router = express.Router();
router.use(express.json()); //express body parser



router.post('/', newBook);



module.exports = router;