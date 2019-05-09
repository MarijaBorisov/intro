var express = require('express');

const myFunctions = require('../util/functions');


var router = express.Router();
//express body parser
router.use(express.json());




// RETURNS ALL THE USERS IN THE DATABASE
// **
router.get('/', myFunctions.getAllUsers);


// GETS A SINGLE USER FROM THE DATABASE
// **
router.get('/:id', myFunctions.findUserById);


// DELETES A USER FROM THE DATABASE
// **
router.delete('/:id', myFunctions.deleteUserById);


// UPDATES A SINGLE USER IN THE DATABASE
// **
router.put('/:id', myFunctions.updateUser);


// USER LOGIN API - generating token in the call
// **
// router.post('/login', myFunctions.login);



// USER LOGIN API 2 - calling the function generateJwt() from user.js to generate token
// **
router.post('/login', myFunctions.login2);


// USER SIGNUP API - CREATE NEW USER
// **
router.post('/signup', myFunctions.signup);


// RETURNS TWO LAST ADDED USERS FROM DB
// **
router.get('/get/two', myFunctions.getTwoLast);


// GET ALL USERNAMES AND EMAILS FROM DB
// **
router.get('/find/agg', myFunctions.showAllUsersAndEmails);


// GROUP BY PROFESSION 
// **
router.get('/group/by', myFunctions.groupByProfession);


// GET ALL EXCEPT ONE
// **
router.get('/all/exc/:name', myFunctions.getAllExceptOne);


// IGNORE NOT EXISTING FIELDS
// **
router.get('/not/exi', myFunctions.notExist);


// CREATE NEW USER - NO SIGNUP
// **
// router.post('/', (req, res, next) => {
//     logger.info('POST fired: create new user. ' + Date(Date.now()));
//     User.create({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password
//         },
//         (err, user) => {
//             if (err) return res.status(500).send("There was a problem adding the information to the database.");
//             res.status(200).send(user);
//         });
// });


module.exports = router;