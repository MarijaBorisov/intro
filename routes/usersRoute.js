var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');


var User = require('../components/user/UserController');
router.get('/', User.getAllUsers);
// router.get('/:id', User.getUserById);
// router.post('/', User.addUser);
// router.delete('/:id', User.deleteUser);
// router.put('/:id', User.updateUser);


router.post('/register',
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage(' Password must be at least 6 chars long'), User.registerUser);

module.exports = router;