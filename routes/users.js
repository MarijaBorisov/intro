const express = require('express');
const router = express.Router();
const userService = require('../utils/functions');

router.get("/all", userService.getAllUsers);
router.post('/users', userService.createUser);
router.post('/login', userService.login);
router.post('/post', userService.verifyToken, userService.verifyTokenRoute, userService.createPost);
router.get('/lastTwo', userService.getLastTwo);

module.exports = router;