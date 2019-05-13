var express = require('express');
var logger = require('../../utils/logs/winston')
var User = require('../user/User');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
var registerUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.info('Incorrect');
        return res.status(422).json({ errors: errors.array() });
    }
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).then((user) => {
        console.log("Userrrrr" + user);
        logger.info('User has been successfully saved');
        res.status(200).send("User has been successfully saved");

    }).catch((err, user) => {
        console.log(user);
        console.log(err);
        return res.status(500).send("Problem with adding user");
    })
}
var loginUser = (req, res) => {
    const email = req.body.email;
    User.findOne({ email: email }).then((user) => {
        if (user && user.validPassword(req.body.password)) {
            return jwt.sign({ user }, 'secretkey', { expiresIn: '60s' },
                (err, token) => {
                    console.log(token);
                    res.json({
                        token
                    });
                });
        }
        else {
            return res.json({ message: 'Incorrect username or password!' });

        }
    }).catch((err) => {
        if (err) {
            return err;
        }
    })
}

/** *********************************TEST********************/
var addPost = (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
}

// addUser = (req, res) => {
//     User.create({
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email
//     })
//         .then((err, users) => {
//             logger.info('OK');
//             res.status(200).send(users);

//         })
//         .catch((err, user) => {
//             return res.status(500).send("Problem with adding user");
//         })
// }


getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        //WS   console.log(users);
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
}

getUserById = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send("There are problem finding user");
        if (!user) return res.status(404).send("No  user found");
        else res.status(200).send(user);
    })
}


deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return res.status(500).send("There are problem finding user");
        if (!user) return res.status(404).send("No  user found");
        else res.status(200).send(user);
    })
}

updateUser = (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body, { upsert: true })
        .then(user => {
            logger.info('Successfully saved changes!')
            res.status(200).send(user)
        })
        .catch((err, user) => {
            logger.error('Cannot update user!')
            return res.status(500).send('Cannot update user!');
        })
}

getUsersName = (req, res) => {
    /************ZA ISPISIVANJE IMENA AKO POSTOJI USERNAME********************/
    User.aggregate(
        [
            { $match: { username: { $exists: true } } },
            { $project: { _id: 0, username: 1 } }
        ]
    ).then((users) => {
        res.send(users)
    })
        .catch(function (err) {
            res.status(404).send("Not available");
        })
    /************ZA ISPISIVANJE OBJEKATA AKO POSTOJI USERNAME****************************** */
    // User.find({ username: { $exists: true } })
    //     .then((users) => {
    //         res.send(users)
    //     })
    //     .catch(function (err) {

    //         res.status(404).send("Cannot find users");
    //     })
}

getLastFiveUsers = (req, res) => {
    // User.find().sort({ _id: -1 }).limit(5). 
    /**OR */
    User.aggregate([
        { $sort: { _id: -1 } },
        { $limit: 4 }
    ]).
        then((users) => {
            res.send(users);
        })
        .catch(() => {
            res.status(404).send("Users not found");
        })
}


AllUserWithoutDanijela = (req, res) => {
    User.aggregate([
        { $match: { username: { "$ne": "Danijela 34534" } } }
    ])
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            console.log(err);
        })
}
UsersWithNameDanijela = (req, res) => {
    User.aggregate([
        { $match: { username: { "$eq": "Danijela 34534" } } }
    ])
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            console.log(err);
        })
}



getTheRequestedNameIfExistsOrSetNewOne = (req, res) => {
    User.aggregate([
        {
            $project: {
                username:
                    { $cond: { if: { $eq: ["$username", "Danijela 34534"] }, then: "Danijela 34534", else: "Jovan" } }
            }
        }
    ]).then(users => {
        res.send(users);
    })
        .catch(err => {
            console.log(err);
        })
}
module.exports = {
    getAllUsers,
    // addUser,
    // getUserById,
    // deleteUser,
    // updateUser,
    registerUser,
    loginUser,
    addPost,
    getUsersName,
    getLastFiveUsers,
    AllUserWithoutDanijela,
    UsersWithNameDanijela,
    getTheRequestedNameIfExistsOrSetNewOne
}