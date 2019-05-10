const logger = require('../logger');
const {BookModel} = require('../models/Book');


// CREATE NEW BOOK
// **
var newBook = (req, res, next) => {
    logger.info('Create new book fired. ' + Date(Date.now()));

    BookModel.create({
            author: req.body.author,
            title: req.body.title,
            genre: req.body.genre,
            pages: req.body.pages,
            copies: req.body.copies
        },
        (err, book) => {
            console.log(err);
            if (err) return res.status(500).send(err.errmsg);

            res.status(200).send(book);
        });
};



module.exports = {
    newBook
}