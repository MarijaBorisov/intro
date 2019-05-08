var express = require('express');
var router = express.Router();
var sc = require('../components/users/usersFunctions').userComponents;

router.get('/', sc.getUsersPage);
router.get('/all', sc.verifyToken, sc.verifyUsersToken, sc.getAllUsers);
router.post('/add', sc.createUser);
//router.get('/:name', sc.getUserByName);
router.delete('/remove/:name', sc.removeUserByName);
router.put('/update', sc.updateUser);
router.put('/updatecreate', sc.updateOrCreate);
router.put('/findone', sc.findAndUpdateUser);
router.post('/login', sc.userLogin);
router.get('/lastFive', sc.lastFive);


module.exports = router;