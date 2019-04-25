const express = require('express');
const router = express.Router();
const userService = require('../utils/functions');

router.get("/all", userService.getAllUsers);
router.post('/users', userService.createUser);

module.exports = router;