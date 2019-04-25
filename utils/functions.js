const Book = require('../models/book');
const User = require('../models/user');
const logger = require('../config/logger').logger;

module.exports.getAllBooks = (req, res, next) => {

  Book.find()
    .then(function (books) {

      logger.info("Getting all books ... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot find books");
      res.status(404).send("Cannot find books");
    })
};

module.exports.createBook = (req, res) => {
  logger.info("POST request - Creating book ... ");

  Book.create(req.body)
    .then(function (book) {
      logger.info("Creating book ... ");
      res.send(book);
      logger.info("Book is created");
    }).catch(function (err) {
      logger.error("Cannot add book");
      res.status(404).send("Cannot add book");
    })
    ;

};

module.exports.getAllUsers = (req, res, next) => {

  User.find()
    .then(function (books) {

      logger.error("Getting all users ... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot find user");
      res.status(404).send("Cannot find user");
    })
};

module.exports.createUser = (req, res) => {
  logger.info("POST request - Creating user ... ");
  User.create(req.body)
    .then(function (book) {
      logger.info("Creating user ... ");
      res.send(book);
      logger.info("User is created");
    }).catch(function (err) {
      logger.error("Cannot add user");
      res.status(404).send("Cannot add user");
    })
    ;

};