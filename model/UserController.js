var express = require('express');
const logger = require('../logger');
const User = require('./User');
const jwt = require('jsonwebtoken');
const checkAuth = require('../util/check-auth');

var router = express.Router();

//express body parser
router.use(express.json());

var secretWord = process.env.SECRETWORD;


// RETURNS ALL THE USERS IN THE DATABASE
// **
router.get('/', checkAuth, (req, res, next) => {
    logger.log('info', 'GET fired: show all users from database. ' + Date(Date.now()));

    User.find({}, (err, users) => {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});


// GETS A SINGLE USER FROM THE DATABASE
// **
router.get('/:id', (req, res, next) => {
    logger.info('GET fired: get one user-find by id. ' + Date(Date.now()));

    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send('Error: id invalid.');
        if (!user) return res.status(404).send("No such user in the database.");
        res.status(200).send(user);
    });
});


// DELETES A USER FROM THE DATABASE
// **
router.delete('/:id', (req, res, next) => {
    logger.log('info', 'DELETE fired: delete user-find by id. ' + Date(Date.now()));

    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send(`User ${user.username} removed from database.`);
    });
});


// UPDATES A SINGLE USER IN THE DATABASE
// **
router.put('/:id', (req, res, next) => {
    logger.info('PUT fired: update a user-find by id. ' + Date(Date.now()));

    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, user) => {
        if (err) return res.status(500).send(`There was a problem updating the user  ${user.username} .`);
        res.status(200).send(user);
    });
});


// USER LOGIN API 
// **
// router.post('/login', (req, res, next) => {
//     logger.info(`POST fired: login user ${req.body.email} , ${Date(Date.now())}`);

//     // find user with requested email
//     User.findOne({
//         email: req.body.email
//     }, function (err, user) {
//         if (user === null) {
//             return res.status(400).send({
//                 message: `User ${req.body.email} not found.`
//             });
//         } else {
//             if (user.validPassword(req.body.password)) {
//                 const token = jwt.sign({
//                         email: user.email,
//                         id: user._id
//                     },
//                     secretWord, {
//                         expiresIn: "1h"
//                     }
//                 );
//                 return res.status(201).send({
//                     message: `User ${req.body.email} logged in`,
//                     token: token
//                 })
//             } else {
//                 return res.status(400).send({
//                     message: "Wrong Password"
//                 });
//             }
//         }
//     });
// });



// USER LOGIN API 2 - calling the function generateJwt() from user.js to generate token
// **
router.post('/login', (req, res, next) => {
    logger.info(`POST fired: login user ${req.body.email} , ${Date(Date.now())}`);

    // find user with requested email
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (user === null) {
            return res.status(400).send({
                message: `User ${req.body.email} not found.`
            });
        } else {
            if (user.validPassword(req.body.password)) {
                const token = user.generateJwt();
                //console.log(user.generateJwt());
                return res.status(201).send({
                    message: `User ${req.body.email} logged in`,
                    token: token
                })
            } else {
                return res.status(400).send({
                    message: "Wrong Password"
                });
            }
        }
    });
});


// USER SIGNUP API - CREATE NEW USER
// **
router.post('/signup', (req, res, next) => {
    logger.info('POST fired: signup a new user. ' + Date(Date.now()));

    // creating empty user object
    let newUser = new User();

    // intialize newUser object with request data 
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    // save newUser object to database 
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).send({
                message: err.message
            });
        } else {
            return res.status(201).send({
                message: `User ${user.username} succesfully added to database.`
            });
        }
    });
});



// RETURNS TWO LAST ADDED USERS FROM DB
// **
router.get('/get/two', (req, res, next) => {
    logger.info(`GET fired: get two users from db - ${Date(Date.now())}`);

    User.find({}, (err, users) => {
        if (err) {
            return res.status(500).send("There was a problem finding last two users.");
        } else {
            res.status(200).send(users);
        }
    }).sort('-_id').limit(2);
});



// CREATE NEW USER - NO SIGNUP
// **
// router.post('/', (req, res, next) => {
//     logger.info('POST fired: create new user. ' + Date(Date.now()));
//     User.create({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password
//         },
//         (err, user) => {
//             if (err) return res.status(500).send("There was a problem adding the information to the database.");
//             res.status(200).send(user);
//         });
// });


module.exports = router;