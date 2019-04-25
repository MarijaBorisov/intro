var express = require('express');
var router = express.Router();
var logger = require('../../utils/logs/winston');
var User = require('../user/User');

//add new user
router.post('/users', (req, res) => {
    User.create({
        usename: req.body.name,
        password: req.body.password,
        email: req.body.email
    })
        .then((err, user) => {
            logger.info('OK');
            res.status(200).send(user);

        })
        .catch((err, user) => {
            return res.status(500).send("Problem with adding user");
        })
})

//get all users
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        console.log(users);
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
})

//get user by id
router.get('/users/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send("There are problem finding user");
        if (!user) return res.status(404).send("No  user found");
        else res.status(200).send(user);
    })
})


//delete user
router.delete('/users/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return res.status(500).send("There are problem finding user");
        if (!user) return res.status(404).send("No  user found");
        else res.status(200).send(user);
    })
})


router.put('/users/:id', function (req, res) {
    console.log(req.params.id);
    var options = { upsert: true, new: true, setDefaultsOnInsert: true }
    User.findOneAndUpdate({ id: req.params.id }, req.body, options, function (err, user) {
        if (err) return res.status(500).send("Problem with updating user");
        res.status(200).send(user);
    });
});



module.exports = router;