var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');

var User = require('../components/user/UserController');
var auth = require('../auth/verifyToken')

router.get('/', User.getAllUsers);

router.post('/register',
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage(' Password must be at least 6 chars long'), User.registerUser);

router.post('/login', User.loginUser);
router.post('/post', auth.verifyToken, User.addPost);

router.get('/getUsersName', User.getUsersName)

router.get('/getLastFiveUser', User.getLastFiveUsers)
router.get('/getUsersWithoutDanijela', User.AllUserWithoutDanijela)
router.get('/usersWithNameDanijela', User.UsersWithNameDanijela)
router.get('/getNameIfExist', User.getTheRequestedNameIfExistsOrSetNewOne)
router.get('/:id', User.getUserById);
router.post('/', User.addUser);
router.delete('/:id', User.deleteUser);
router.put('/:id', User.updateUser);
module.exports = router;