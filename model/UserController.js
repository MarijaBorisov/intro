var express = require('express');
var router = express.Router();
const logger = require('../logger');

//express body parser
router.use(express.json());

const User = require('./User');



// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', (req, res, next) => {
    logger.info('GET fired: show all users from database. ' + Date(Date.now()));

    User.find({}, (err, users) => {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});


// CREATES A NEW USER
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


// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', (req, res, next) => {
    logger.info('GET fired: get one user-find by id. ' + Date(Date.now()));
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No such user found.");
        res.status(200).send(user);
    });
});


// DELETES A USER FROM THE DATABASE
router.delete('/:id', (req, res, next) => {
    logger.info('DELETE fired: delete user-find by id. ' + Date(Date.now()));
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send(`User ${user.username} removed from database.`);
    });
});


// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', (req, res, next) => {
    logger.info('PUT fired: update a user-find by id. ' + Date(Date.now()));
    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, user) => {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


// USER LOGIN API 
router.post('/login', (req, res, next) => {
    // find user with requested email
    logger.info(`POST fired: login user ${req.body.email} at: ${Date(Date.now())}`);

    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (user === null) {
            return res.status(400).send({
                message: "User not found."
            });
        } else {
            if (user.validPassword(req.body.password)) {
                return res.status(201).send({
                    message: "User Logged In",
                })
            } else {
                return res.status(400).send({
                    message: "Wrong Password"
                });
            }
        }
    });
});


// user signup api 
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
                message: `User ${user.username} succesfully added.` 
            });
        }
    });
});


module.exports = router;