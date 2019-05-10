var User = require('../../models/user');
var logger = require('../../util/logger');
var jwt = require('jsonwebtoken');

var getUsersPage = (req,res,next) => {
   logger.info('Home page for users has benn successfully appeared');
   res.send('Users page');
}
var createUser = (req,res,next) => {

   User2 = new User(req.body);
   User2.save()
   .then(user => {
      logger.info( 'User with email - ' + `${req.body.email}` + ' is created!')
      res.status(200).send(user)
   })
   .catch((err) =>{
      res.status(404).send('404');
      logger.error('Failed to add user.');
   })
}
var getAllUsers = (req,res,next) => {
    User.find()
   .then(user => {
      logger.info('All users has been successfully taken.')
      res.status(200).send(user)
   })
   .catch(
      showError404,
      logger.error('Failed to get list of all users.')
   );
}
var getUserByName = (req,res,next) => {
   let name2 = req.params.name;
   User.find({name: name2})
   .then(user => {
      res.status(200).send(user)
      logger.info('Successfully taken user by name' + `${name2}`)
   })
   .catch(
      showError404,
      logger.error('User is not found')
   )
}
var removeUserByName = (req,res,next) => {
   let name2 = req.params.name;
   User.remove({name: name2})
   .then(user => {
         logger.info('Successfully removed user by name ' + `${name2}`)
         res.status(200).send(user)
   })
   .catch(
      showError404,
      logger.error('Failed to remove user by name ' + `${name2}`)
   )
}
var showError404 = (req,res,next) => {res.status(404).send('404')}

var updateUser = (req, res, next) => {
    
   User.updateOne({_id: req.body._id}, req.body)
   .then(user => {
      res.status(200).send(user)
      logger.info('User successfully updated')
   })
   .catch(
      showError404,
      logger.error('Failed to update user!')
   );

}
var updateOrCreate = (req, res, next) => {
   User.updateOne({_id: req.body._id}, req.body, {upsert: true})
   .then(user => {
      logger.info('Data has been successfully saved into DB')
      res.status(200).send(user)
   })
   .catch(
      showError404,
      logger.error('Failed to update and create user')
   );
}

var findAndUpdateUser = (req, res, next) => {
   
   User.findOneAndUpdate({name: req.body.name}, {name: req.body.secondName})
   .then(user => {
      if(user){
            res.status(200).send(user)
      }else{
        User.create({
            name: req.body.name,
            school: req.body.password,
            city: req.body.email
         })
         .then(user => res.send(user))
         .catch(
            showError404,
            logger.error('Failed to create user')
         );
      }
   })
   .catch(
      showError404,
      logger.error('Failed to update user')
   );
}
var lastFive = (req, res, next) => {
   User.find().sort({_id: -1}).limit(2)
   .then(user => {
      res.status(200).send(user)
      logger.info('Successfully taken last two users from DB!')
   })
   .catch(err => {
      res.status(404).send('404');
      logger.error('Faild to take last two users from DB!');
   })
}
var userLogin = (req, res, next) => {
   
   let username = req.body.name;
   let pass = req.body.password;

   User.findOne({ name: username}).then(user => {
      var salt = user.salt;
      var hashPass = user.password;
      if(User.validPassword(pass, hashPass, salt)){
         //res.status(200).send('Successfully logged in!')
         logger.info('Successfully logged in!')
         jwt.sign({user}, 'secretKey', (err, token) => {
            res.json({token});
         });
      }else{
         res.send('Invalid log data!')
         logger.error('Invalid log data!')
      }  
   })
   .catch((err) =>{
         res.send('Invalid log data!')
         logger.error('Invalid log data!')
   });
}

var verifyToken = (req,res,next) => {
   const bearerHeader = req.headers['authorization'];
   if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
   }else{
      res.sendStatus(403);
   }
}
var verifyUsersToken = (req,res,next) => {
   jwt.verify(req.token, 'secretKey', (err, authorizationData) => {
      if(err){
         res.sendStatus(403);
      }else{
         next();
      }
   })
}

var groupUserByName = (req,res,next) => {

   User.aggregate([
      { $group: { _id: "$email", numberOfUsers: { $sum: 1 } } },
      { $project: { _id: 1, email: 1, numberOfUsers: 1 } }
   ])
   .then(user => {
      res.send(user)
      logger.info('Resolved - group users by name!')
   })
   .catch(err => {
      res.send('Reject - group users by name!')
      logger.error('Reject - group users by name!')
   })
}

var filterByRegex = (req,res,next) => {

   User.aggregate([
      { $match: { name:  { $regex: /^Ta/} } },
      { $project: { name: 1 } }
   ])
   .then(user => {
      res.send(user)
      logger.info('Resolved - filter users by firstname with regex!')
   })
   .catch(err => {
      res.send('Reject - filter users by firstname with regex!')
      logger.error('Reject - filter users by firstname with regex! ' + err)
   })
}
var filterByRegexNotLikeSpecificNames = (req,res,next) => {

   User.aggregate([
     { $match: { name:  { $nin: [/^Uros/i, /^Petar/i] } } },
     { $project: { name: 1 } }
   ])
   .then(user => {
      res.send(user)
      logger.info('Resolved - filter by specific names!')
   })
   .catch(err => {
      res.send('Reject - filter by specific names')
      logger.error('Reject - filter by specific names!')
   })
}
var changeNameIfNotExists = (req,res,next) => {

   User.aggregate([
      { $project: { name: { $cond: { if: { $eq: ["$name", 'Tamara'] }, then: 'newName', else: '$name' }} } }
   ])
   .then(user => {
      res.send(user)
      logger.info('Resolved - name is checked and changed!')
   })
   .catch(err => {
      res.send('Reject - change name!')
      logger.error('Reject - change name!' + err)
   })
}
var showFieldsWhichExist = (req,res,next) => {
   User.aggregate([
         { $match: { name: { $exists: true}}},
         { $project: { name: 1 , email: 1 } }
      ])
      .then(user => {
         res.send(user)
         logger.info('Resolved - users with all fileds are taken!')
      })
      .catch(err => {
         res.send('Reject to take users and show all fields!')
         logger.error('Reject to take users and show all fields!' + err)
      })
}
var showFieldsContainsFieldAge = (req,res,next) => {
   User.aggregate([
         { $match: { age: { $exists: true}}},
         { $project: { age: 1 , name: 1 } }
      ])
      .then(user => {
         res.send(user)
         logger.info('Resolved - users with field age!')
      })
      .catch(err => {
         res.send('Reject to take users with field age!')
         logger.error('Reject to take users with field age!' + err)
      })
}
var allNames = (req,res,next) => {
   User.aggregate([
        { $project: {  name: 1 } }
      ])
      .then(user => {
         res.send(user)
         logger.info('Resolved - list of all names!')
      })
      .catch(err => {
         res.send('Reject to take list of all users names!')
         logger.error('Reject to take list of all users names!' + err)
      })
}

var nameWhichIsNotSpecificName = (req,res,next) => {
   User.aggregate([
         { $match: { name: { $eq: 'Petar'}}},
         //{ $match: { name: { $ne: 'Petar'}}}, 'List of all names that are not equals to Petar'
         { $project: {  name: 1 } }
      ])
      .then(user => {
         res.send(user)
         logger.info('Resolved - list of all names that are equals to Petar!')
      })
      .catch(err => {
         res.send('Reject to take list of all names that are equals to Petar!')
         logger.error('Reject to take list of all names that are equals to Petar!' + err)
      })
}

var lastTwo = (req,res,next) => {
   User.aggregate([
         {_id : -1 },
         { $limit: 2 },
         { $project: {  _id: 1 , name: 1 } }
      ])
      .then(user => {
         res.send(user)
         logger.info('Resolved - last two users!')
      })
      .catch(err => {
         res.send('Reject to take last two users!')
         logger.error('Reject to take last two users!' + err)
      })
}

var sumAndAvgOfAges = (req,res,next) => {
   User.aggregate([
         
         { $group: { _id: 1, sumAge: { $sum: "$age" }, avgAge: { $avg: "$age" } } }
         
      ])
      .then(user => {
         res.send(user)
         logger.info('Resolved - sum and avg of ages of all users!')
      })
      .catch(err => {
         res.send('Reject - sum and avg of ages of all users!')
         logger.error('Reject - sum and avg of ages of all users!' + err)
      })
}

var subtractLastUsersAndFirstUsersYears = (req,res,next) => {
   User.aggregate([
         
         { $group: { _id: 1, 
            first: { $first: "$$ROOT"}, 
            last: { $last: "$$ROOT"}  
         } },
         { $project: { _id: 1, 
            ageDifference: { $abs: { $subtract: [ "$first.age", "$last.age" ] } }
         } }
      
      ])
      .then(user => {
         res.send(user)
         logger.info('Resolved - subtract age from two users!')
      })
      .catch(err => {
         res.send('Reject - subtract age from two users!')
         logger.error('Reject - subtract age from two users!' + err)
      })
}

var subtractLastTwoUsersYears = (req,res,next) => {
   User.aggregate([
         { $sort: {_id : -1 } },
         { $limit: 2 },
         { $group: { _id: 1, 
            first: { $first: "$$ROOT"}, 
            last: { $last: "$$ROOT"}  
         } },
         { $project: { _id: 1, 
            ageDifference: { $abs: { $subtract: [ "$first.age", "$last.age" ] } }
         } }
      
      ])
      .then(user => {
         res.send(user)
         logger.info('Resolved - subtract age from two users!')
      })
      .catch(err => {
         res.send('Reject - subtract age from two users!')
         logger.error('Reject - subtract age from two users!' + err)
      })
}

var timeBetweenTwoTimestamps = (req,res,next) => {
   User.aggregate([
         { $sort: {_id : -1 } },
         { $limit: 2 },
         { $group: { _id: 1, 
            first: { $first: "$$ROOT"}, 
            last: { $last: "$$ROOT"}  
         } },
         { $project: { _id: 1, 
            ageDifference: { $abs: { $subtract: [ { $second: "$first.time"}, { $second: "$last.time" } ] } } 
         } }
      
      ])
      .then(user => {
         res.send(user)
         logger.info('Resolved - subtract time from two users!')
      })
      .catch(err => {
         res.send('Reject - subtract time from two users!')
         logger.error('Reject - subtract time from two users!' + err)
      })
}

var yearFromTimestamp = (req,res,next) => {
   User.aggregate([
         
        { $project: { _id: 1, year: { $year: "$time"}, month: { $month: "$time"} } }
        
      ])
      .then(user => {
         res.send(user)
         logger.info('Resolved - year from timestamp!')
      })
      .catch(err => {
         res.send('Reject - year from timestamp!')
         logger.error('Reject - year from timestamp!' + err)
      })
}

var yearForTimezone = (req,res,next) => {
   User.aggregate([
         
        { $project: { _id: 1, time:1, 
         timeHours:  
            { $hour : { date: "$time", timezone: 'Europe/Belgrade'} } , 
         timeMinutes:  
            { $minute: { date: "$time", timezone: 'Europe/Belgrade'} } , 
         timeSeconds:  
            { $second : { date: "$time", timezone: 'Europe/Belgrade'} } 
         } }
        
      ])
      .then(user => {
         res.send(user)
         logger.info('Resolved - time from timestamp and timezone!')
      })
      .catch(err => {
         res.send('Reject - time from timestamp and timezone!')
         logger.error('Reject - time from timestamp and timezone!' + err)
      })
}

exports.userComponents = {
    getUsersPage,
    createUser,
    getAllUsers,
    getUserByName,
    removeUserByName,
    updateUser,
    updateOrCreate,
    findAndUpdateUser,
    showError404,
    userLogin,
    verifyToken,
    verifyUsersToken,
    lastFive,
    groupUserByName,
    filterByRegex,
    filterByRegexNotLikeSpecificNames,
    changeNameIfNotExists,
    showFieldsWhichExist,
    showFieldsContainsFieldAge,
    allNames,
    nameWhichIsNotSpecificName,
    lastTwo,
    sumAndAvgOfAges,
    subtractLastUsersAndFirstUsersYears,
    subtractLastTwoUsersYears,
    timeBetweenTwoTimestamps,
    yearForTimezone,
    yearFromTimestamp
    
}