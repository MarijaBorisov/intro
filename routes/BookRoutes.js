var express = require('express');

const {
    newBook,
    getDiff,
    dateDiff,
    getSpecificTimestamps,
    timezone
} = require('../controllers/BookController');


var router = express.Router();
router.use(express.json()); //express body parser


// create new book
// **
router.post('/', newBook);


// get difference of pages and sum of copies issued
router.get('/getDiff', getDiff);


// get date difference
router.get('/dateDiff', dateDiff);


// get timestamp specifics
// **
router.get('/time', getSpecificTimestamps);


// get date with timezone in belgrade
// **
router.get('/timezone', timezone);



module.exports = router;