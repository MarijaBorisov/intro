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

var verifyToken =(req,res,next) => {

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
    verifyUsersToken
}