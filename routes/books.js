const express = require('express');
const router = express.Router();
const bookService = require('../utils/functions');

router.get("/all", bookService.getAllBooks);
router.post('/books', bookService.createBook);
router.get("/countByAuthor", bookService.countByAuthor);
router.get("/sumPricesByAuthor", bookService.sumPricesByAuthor);
router.get("/getAuthorNames", bookService.getAuthorNames);
router.get("/getAllAuthorsThatAreNotEqualToPattern", bookService.getAllAuthorsThatAreNotEqualToPattern);
router.get("/getAllAuthorsAndChangeNameIfEqualToPattern", bookService.getAllAuthorsAndChangeNameIfEqualToPattern);
router.get("/getAllAuthorsThatHavePrice", bookService.getAllAuthorsThatHavePrice);
module.exports = router;