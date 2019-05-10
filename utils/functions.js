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

module.exports.countByAuthor = (req, res, next) => {

  Book.aggregate(
    [

      { $group: { _id: "$author", numberOfBooks: { $sum: 1 } } },
      { $project: { _id: 1, author: 1, numberOfBooks: 1 } }
    ]
  )

    .then(function (books) {

      logger.info("Counting all books by author... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot find books");
      res.status(404).send("Cannot find books");
    })
};

module.exports.sumPricesByAuthor = (req, res, next) => {

  Book.aggregate(
    [
      { $match: {} },
      { $group: { _id: "$author", total: { $sum: "$price" } } }
    ]
  )
    .then(function (books) {

      logger.info("Sum all books by author... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot sum books");
      res.status(404).send("Cannot sum books");
    })
};

module.exports.avgPricesAndSum = (req, res, next) => {

  Book.aggregate(
    [
      { $group: { _id: 1, avgPrices: { $avg: "$price" }, sumPrices: { $sum: "$price" } } }
    ]
  )
    .then(function (books) {

      logger.info("Avg and sum prices... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot sum and get avg of books");
      res.status(404).send("Cannot sum and get avg of books");
    })
};

module.exports.getAuthorNames = (req, res, next) => {

  Book.aggregate(
    [
      { $project: { author: 1 } }
    ]
  )
    .then(function (books) {

      logger.info("All author names... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot find authors");
      res.status(404).send("Cannot find authors");
    })
};

module.exports.getLastTwoDoc = (req, res, next) => {

  Book.aggregate(
    [
      // { $sort: { _id: -1 } },
      // { $limit: 2 },
      // { $match: {} },

      //array('$match' => $document),
      //   array('$group' => array('_id' => '$book_id', 'date' => array('$max' => '$book_viewed'),  'views' => array('$sum' => 1))),
      //   array('$sort' => $sort),

      // // get total, AND preserve the results
      //   array('$group' => array('_id' => null, 'total' => array( '$sum' => 1 ), 'results' => array( '$push' => '$$ROOT' ) ),
      // // apply limit and offset
      //   array('$project' => array( 'total' => 1, 'results' => array( '$slice' => array( '$results', $skip, $length ) ) ) )
      // ))


      { $match: {} },
      { $group: { _id: null, total: { $sum: 1 }, result: { $push: "$$ROOT" } } },
      //{ $project: { _id: 1, name: "$result.", author: 1, skip: { $abs: { $subtract: ["$total", 2] } } } },
      // { $count: "numberOfBooks" },
      { $project: { _id: 1, result: "$result", skip: { $abs: { $subtract: ["$total", 2] } } } },

      // { $group: { _id: null, result2: { $push: ["$result", "$skip"] }} }

      //{ $skip: "$skip" }
      // { $project: { _id: 1, numberOfBooks: 1 } }
    ]
  )
    .then(function (books) {

      logger.info("Getting last two docs... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot get last two docs - " + err);
      res.status(404).send("Cannot get last two docs");
    })
};
module.exports.multiplyPrices = (req, res, next) => {

  Book.aggregate(
    [
      { $project: { _id: 1, name: 1, totalPrice: { $multiply: ["$price", "$qty"] } } }
    ]
  )
    .then(function (books) {

      logger.info("Getting total price for book... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot get total price - " + err);
      res.status(404).send("Cannot get total price");
    })
};
module.exports.getAuthorByFilter = (req, res, next) => {

  Book.aggregate(
    [
      { $match: { author: { $regex: /^mi/i } } },

      { $project: { author: 1 } }

    ]
  )
    .then(function (books) {

      logger.info("All author names... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot find authors");
      res.status(404).send("Cannot find authors" + err);
    })
};

module.exports.getAllAuthorsThatAreNotEqualToPattern = (req, res, next) => {

  Book.aggregate(
    [
      { $match: { author: { $ne: 'mika' } } },
      { $project: { author: 1 } }

    ]
  )
    .then(function (books) {

      logger.info("All author names... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot find authors");
      res.status(404).send("Cannot find authors" + err);
    })
};
module.exports.getAllAuthorsThatAreEqualToPattern = (req, res, next) => {

  Book.aggregate(
    [
      { $match: { author: { $eq: 'mika' } } },
      { $project: { author: 1 } }

    ]
  )
    .then(function (books) {

      logger.info("All author names... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot find authors");
      res.status(404).send("Cannot find authors" + err);
    })
};

module.exports.getAllAuthorsAndChangeNameIfEqualToPattern = (req, res, next) => {

  Book.aggregate(
    [
      { $project: { author: { $cond: { if: { $eq: ["$author", 'mika'] }, then: 'noname', else: '$author' } } } }
    ]
  )
    .then(function (books) {

      logger.info("All author names... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot find authors");
      res.status(404).send("Cannot find authors" + err);
    })
};

module.exports.getAllAuthorsThatHavePrice = (req, res, next) => {

  Book.aggregate(
    [
      { $match: { price: { $exists: true } } },
      { $project: { _id: 1, author: 1, price: 1 } }
    ]
  )
    .then(function (books) {

      logger.info("All author names... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot find authors");
      res.status(404).send("Cannot find authors" + err);
    })
};

module.exports.getFirstAndLastDocs = (req, res, next) => {

  Book.aggregate(
    [{ $sort: { _id: -1 } },
    { $limit: 2 },
    {
      $group: {
        _id: null,
        first: { $first: "$$ROOT" },
        last: { $last: "$$ROOT" }
      }


    },
    { $project: { _id: 1, name: 1, priceDifference: { $abs: { $subtract: ["$first.price", "$last.price"] } } } }
    ]
  )
    .then(function (books) {

      logger.info("All author names... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot find authors");
      res.status(404).send("Cannot find authors" + err);
    })
};

module.exports.getTimeDifferneceBetweenLastTwo = (req, res, next) => {

  Book.aggregate(
    [{ $sort: { _id: -1 } },
    { $limit: 2 },
    {
      $group: {
        _id: null,
        first: { $first: "$$ROOT" },
        last: { $last: "$$ROOT" }
      }


    },
    { $project: { _id: 1, name: 1, timeDifference: { $abs: { $subtract: ["$first.time", "$last.time"] } } } }
    ]
  )
    .then(function (books) {

      logger.info("All author names... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot find authors");
      res.status(404).send("Cannot find authors" + err);
    })
};
module.exports.getYearFromTimestamp = (req, res, next) => {

  Book.aggregate([

    { $project: { _id: 1, name: 1, year: { $hour: "$time" } } }
  ]
  )
    .then(function (books) {

      logger.info("All author names... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot find authors");
      res.status(404).send("Cannot find authors" + err);
    })
};
module.exports.getLocalTime = (req, res, next) => {

  Book.aggregate([

    { $project: { _id: 1, hour: { $hour: { date: "$time", timezone: 'Europe/Belgrade' } }, minutes: { $minute: { date: "$time", timezone: 'Europe/Belgrade' } }, seconds: { $second: { date: "$time", timezone: 'Europe/Belgrade' } } } }

  ]
  )
    .then(function (books) {

      logger.info("All author names... ");
      res.send(books);

    }).catch(function (err) {
      logger.error("Cannot find authors");
      res.status(404).send("Cannot find authors" + err);
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
    .then(function (user) {

      logger.info("Getting all users ... ");
      res.send(user);

    }).catch(function (err) {
      logger.error("Cannot find users - " + err);
      res.status(404).send("Cannot find users");
    })
};

module.exports.getUserByName = (req, res, next) => {


  let name = req.params.name;
  User.find({ username: name }).then(function (user) {
    logger.info("Getting user by username ... ");
    if (user.length < 1) {
      res.status(404).send("Cannot find user");
    } else {

      res.send(user);
    }


  }).catch(function (err) {
    logger.error("Cannot find user - " + err);
    res.status(404).send("Cannot find user");
  });
};

module.exports.deleteUserByName = (req, res, next) => {
  let name = req.params.name;
  User.remove({ username: name }).then(function (user) {
    logger.info("Getting user by username ... ");
    if (user.deletedCount < 1) {
      res.status(404).send("Cannot find user");
    } else {
      res.send(user);
    }
  }).catch(function (err) {
    logger.error("Cannot find user - " + err);
    res.status(404).send("Cannot find user");
  });

};

module.exports.updateUser = (req, res) => {
  console.log('You made a UPDATE request: ', req.body);
  User.updateOne({ _id: req.body._id }, req.body)
    .then(function (user) {
      if (user.nModified < 1) {
        res.status(404).send("User is not modified");
      } else {

        res.send(user);
      }
    }).catch(function (err) {
      logger.error("Cannot update user - " + err);
      res.status(404).send("Cannot update user");
    })
    ;

};

module.exports.getLastTwo = (req, res, next) => {

  User.find().sort({ _id: -1 }).limit(2)
    .then(function (users) {

      logger.info("Getting last two users ... ");
      res.send(users);

    }).catch(function (err) {
      logger.error("Cannot last 2 users " + err);
      res.status(404).send("Cannot last 2 users ");
    })
};
module.exports.getAllProductsMYSQL = (req, res, next) => {
  logger.info("GET request - Getting all products MYSQL... ");
  logger.info("Getting all products ... ");
  Product.findAll()
    .then(result => {
      // console.log(result[0]);
      res.send(result[0]);
      logger.info("Products are returned");
    })
    .catch(err => {
      logger.error("Cannot find products - " + err);
      res.status(404).send("Cannot find products - " + err);
    });
};
module.exports.createUser = (req, res) => {
  logger.info("POST request - Creating user ... ");
  UserDB = new User(req.body);
  UserDB.save()
    .then(function (user) {
      logger.info("Creating user ... ");
      res.send(user);
      logger.info("User is created");
    }).catch(function (err) {
      logger.error("Cannot add user - " + err);
      res.status(404).send("Cannot add user");
    })
    ;

};
module.exports.createProductMYSQL = (req, res) => {
  logger.info("POST request - Creating user MYSQL... ");
  logger.info("Creating product ... ");
  Product.createProduct(req.body)
    .then(result => {

      res.send(result[0]);
      logger.info("Product is created ... ");
    })
    .catch(err => {
      logger.error("Cannot create product - " + err);
      res.status(404).send("Cannot create product");
    });

};
module.exports.updateProductMYSQL = (req, res) => {
  logger.info("POST request - Update product MYSQL... ");
  logger.info("Updating product ... ");
  Product.updateProduct(req.body.name, req.body.id)
    .then(result => {

      res.send(result[0]);
      logger.info("Product is updated");
    })
    .catch(err => {
      logger.info("Cannot update product - " + err);
      res.status(404).send("Cannot update product");
    });

};
module.exports.removeProductMYSQL = (req, res) => {
  logger.info("DELETE request - Removing product MYSQL... ");
  logger.info("Deleting product ... ");
  Product.deleteProduct(req.body.id)
    .then(result => {

      res.send(result[0]);
      logger.info("Product is deleted");
    })
    .catch(err => {
      logger.error("Cannot delete product - " + err);
      res.status(404).send("Cannot delete product");
    });

};
module.exports.findProductMYSQL = (req, res) => {
  logger.info("GET request - Get product by ID MYSQL... ");
  logger.info("Getting product ... ");
  Product.findByID(req.body.id)
    .then(result => {

      res.send(result[0]);
      logger.info("Product is returned");
    })
    .catch(err => {
      logger.error("Cannot return product - " + err);
      res.status(404).send("Cannot return product");
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
        logger.info("Token - " + token);
        res.json({ token });
      })


    } else {
      logger.error("Password is wrong");
      res.status(404).send("Wrong password");
    }
  }).catch(function (err) {
    //console.log(err);
    logger.error("Cannot find user - " + err);
    res.status(404).send("Cannot find user");
  });

};