const express = require('express');
const router =  express.Router();
const bookService = require('../utils/functions');

router.get("/all", bookService.getAllBooks);
router.post('/books', bookService.createBook);

module.exports = router;