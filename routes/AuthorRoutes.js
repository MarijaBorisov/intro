var express = require('express');

const {
    createNewAuthor,
    getAvg
} = require('../controllers/AuthorController');


var router = express.Router();

router.use(express.json()); //express body parser



// CREATE NEW AUTHOR
// **
router.post('/', createNewAuthor);



// CALCULATE THE SUM AND AVG OF ALL BIRTH YEARS
// **
router.get('/avg', getAvg);



module.exports = router;