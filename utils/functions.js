const Book = require('../models/book');
const User = require('../models/user');
const Product = require('../models/product');
const logger = require('../config/logger').logger;
const jwt = require('jsonwebtoken');
const db = require('../config/dbMySql')

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
module.exports.getAllUsersMYSQL = (req, res, next) => {

  Product.findAll()
    .then(result => {
      // console.log(result[0]);
      res.send(result[0]);
    })
    .catch(err => {
      res.status(404).send("Cannot find product");
    });
};
module.exports.createUser = (req, res) => {
  logger.info("POST request - Creating user ... ");
  UserDB = new User(req.body);
  UserDB.save()
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
module.exports.createUserMYSQL = (req, res) => {
  logger.info("POST request - Creating user MYSQL... ");
  Product.createProduct(req.body)
    .then(result => {

      res.send(result[0]);
    })
    .catch(err => {
      res.status(404).send("Cannot find product");
    });

};
module.exports.updateUserMYSQL = (req, res) => {
  logger.info("POST request - Update user MYSQL... ");
  Product.updateProduct(req.body.name, req.body.id)
    .then(result => {

      res.send(result[0]);
    })
    .catch(err => {
      res.status(404).send("Cannot update product");
    });

};
module.exports.removeUserMYSQL = (req, res) => {
  logger.info("DELETE request - Removing product MYSQL... ");
  Product.deleteProduct(req.body.id)
    .then(result => {
      ;
      res.send(result[0]);
    })
    .catch(err => {
      res.status(404).send("Cannot delete product");
    });

};
module.exports.findUserMYSQL = (req, res) => {
  logger.info("GET request - Get product by ID MYSQL... ");
  Product.findByID(req.body.id)
    .then(result => {
      ;
      res.send(result[0]);
    })
    .catch(err => {
      res.status(404).send("Cannot find product");
    });

};
module.exports.createPost = (req, res) => {
  logger.info("POST request - Creating post ... ");
  res.status(200).send("Post created");

};
module.exports.verifyTokenRoute = (req, res, next) => {
  logger.info("POST request - verifyTokenRoute ... ");
  jwt.verify(req.token, 'secretkey', (err, authData) => {

    if (err) {
      res.status(403).send("Forbidden");
    } else {
      logger.info("Token is correct");
      next();
    }

  })

};


module.exports.verifyToken = (req, res, next) => {
  logger.info("POST request - verifyToken ... ");
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[1];

    req.token = bearerToken;

    next();
  } else {
    res.status(403).send("Forbidden")
  }

};
module.exports.login = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ username: username }).then(function (user) {

    // res.send(user.username);
    let salt = user.salt;

    UserD = new User();
    if (UserD.validPassword(password, user.password, salt)) {
      logger.info("User '" + username + "' is logged in");

      jwt.sign({ user }, 'secretkey', (err, token) => {
        logger.info("Token '" + token + "' is logged in");
        res.json({ token });
      })


    } else {
      logger.error("Password is wrong");
      res.status(404).send("Wrong password");
    }
  }).catch(function (err) {
    //console.log(err);
    logger.error("Cannot find user");
    res.status(404).send("Cannot find user " + err);
  });

};