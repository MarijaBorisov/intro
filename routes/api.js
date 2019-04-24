const express = require('express');
const UserController = require('../model/UserController');
var func = require('../functions/functions');

const router = express.Router();


router.use('/users', UserController);




module.exports = router;