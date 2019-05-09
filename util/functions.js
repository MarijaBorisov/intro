const jwt = require('jsonwebtoken');

const checkAuth = require('../util/check-auth');
const User = require('../model/User');
const logger = require('../logger');


// for the alternative login API with generate token in the function
// var secretWord = process.env.SECRETWORD;


// USER SIGNUP API - CREATE NEW USER
// **
var signup = (req, res, next) => {
    logger.info('POST fired: signup a new user. ' + Date(Date.now()));

    // creating empty user object
    let newUser = new User();

    // intialize newUser object with request data 
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.profession = req.body.profession;

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
}


// USER LOGIN API 2 - calling the function generateJwt() from user.js to generate token
// **
var login2 = (req, res, next) => {
    logger.info(`POST fired: login user ${req.body.email} , ${Date(Date.now())}`);

    // find user with requested email
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (!user) {
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
}



// USER LOGIN API - generating token in this function
// **
//var login = (req, res, next) => {
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
// }



// RETURNS ALL THE USERS IN THE DATABASE
// **
var getAllUsers = (req, res, next) => {
    logger.log('info', 'GET fired: show all users from database. ' + Date(Date.now()));

    User.find({}, (err, users) => {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
}


// UPDATES A SINGLE USER IN THE DATABASE
// **
var updateUser = (req, res, next) => {
    logger.info('PUT fired: update a user-find by id. ' + Date(Date.now()));

    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, user) => {
        if (err) return res.status(500).send(`There was a problem updating the user  ${user.username} .`);
        res.status(200).send(user);
    });
}


// DELETES A SINGLE USER FROM THE DATABASE
// **
var deleteUserById = (req, res, next) => {
    logger.log('info', 'DELETE fired: delete user-find by id. ' + Date(Date.now()));

    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send(`User ${user.username} removed from database.`);
    });
}


// GETS A SINGLE USER FROM THE DATABASE
// **
var findUserById = (req, res, next) => {
    logger.info('GET fired: get one user-find by id. ' + Date(Date.now()));

    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send('Error: id invalid.');
        if (!user) return res.status(404).send("No such user in the database.");
        res.status(200).send(user);
    });
}


// SHOW LAST TWO ENTRIES FROM DATABASE
// **
var getTwoLast = (req, res, next) => {
    logger.info(`GET fired: get two users from db - ${Date(Date.now())}`);

    User.find({}, (err, users) => {
        if (err) {
            return res.status(500).send("There was a problem finding last two users.");
        } else {
            res.status(200).send(users);
        }
    }).sort('-_id').limit(2);
}


// SHOW ALL USERS AND THEIR EMAILS FROM DB
// **
var showAllUsersAndEmails = (req, res, next) => {
    User.aggregate([{
        $project: {
            _id: 0,
            username: 1,
            email: 1,
        }
    }]).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(404).send(err.errmsg);
    });
}


// GROUP ALL USERS BY PROFESSION
// **
var groupByProfession = (req, res, next) => {
    User.aggregate([{
            $match: {
                profession: "programmer"
            }
        },
        {
            $project: {
                username: 1,
                profession: 1
            }
        }
    ]).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(404).send(err.errmsg);
    });
}


// GET ALL EXCEPT ONE
// **
var getAllExceptOne = (req, res, next) => {
    User.aggregate([{
            $match: {
                username: {
                    $ne: req.params.name //match the name we choose in header
                }
            }
        },
        {
            $project: {
                username: 1,
                profession: 1
            }
        }
    ]).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(404).send(err.errmsg);
    });
}


// DO NOT SHOW WHERE FIELDS NOT EXIST
// **
var notExist = (req, res, next) => {
    User.aggregate([{
            $match: {
                profession: {
                    $exists: false
                }
            }
        },
        {
            $project: {
                username: 1,
                profession: 1
            }
        }
    ]).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(404).send(err.errmsg);
    });
}




module.exports = {
    showAllUsersAndEmails,
    getTwoLast,
    groupByProfession,
    getAllExceptOne,
    notExist,
    signup,
    login2,    
    updateUser,
    deleteUserById,
    findUserById,
    getAllUsers
}