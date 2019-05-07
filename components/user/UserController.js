var express = require('express');
var logger = require('../../utils/logs/winston')
var User = require('../user/User');
const { validationResult } = require('express-validator/check');
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
    })
        .then((err, user) => {
            logger.info('User has been successfully saved');
            res.status(200).send("User has been successfully saved");

        })
        .catch((err, user) => {

            return res.status(500).send("Problem with adding user");
        })
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

// getUserById = (req, res) => {
//     User.findById(req.params.id, (err, user) => {
//         if (err) return res.status(500).send("There are problem finding user");
//         if (!user) return res.status(404).send("No  user found");
//         else res.status(200).send(user);
//     })
// }


// deleteUser = (req, res) => {
//     User.findByIdAndRemove(req.params.id, (err, user) => {
//         if (err) return res.status(500).send("There are problem finding user");
//         if (!user) return res.status(404).send("No  user found");
//         else res.status(200).send(user);
//     })
// }

// updateUser = (req, res) => {
//     User.updateOne({ _id: req.params.id }, req.body, { upsert: true })
//         .then(user => {
//             logger.info('Successfully saved changes!')
//             res.status(200).send(user)
//         })
//         .catch((err, user) => {
//             logger.error('Cannot update user!')
//             return res.status(500).send('Cannot update user!');
//         })
// }

module.exports = {
    getAllUsers,
    // addUser,
    // getUserById,
    // deleteUser,
    // updateUser,
    registerUser
}