var express = require('express');
var router = express.Router();
const logger = require('winston');

//express body parser
router.use(express.json());

var User = require('./User');



// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', (req, res, next) => {
    logger.info('GET fired: show all users from database. ' + Date(Date.now()));

    User.find({}, (err, users) => {
        if (err) return res.status(500).send("There was a problem finding the users.");        
        res.status(200).send(users);
    });
});


// CREATES A NEW USER
router.post('/', (req, res, next) => {
    logger.info('POST fired: create new user. ' + Date(Date.now()));
    User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        },
        (err, user) => {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});


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
        res.status(200).send(`User ${user.username} successfully deleted from database.`);
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


module.exports = router;