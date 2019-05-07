const express = require('express');
const router = express.Router();
const userService = require('../utils/functions');



router.get("/all", userService.getAllUsersMYSQL);
router.get("/findByID", userService.findUserMYSQL);
router.post('/products', userService.createUserMYSQL);
router.post('/updateProduct', userService.updateUserMYSQL);
router.delete('/products', userService.removeUserMYSQL);
module.exports = router;