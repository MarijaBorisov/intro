var User = require('../../models/user');
//const { checkSchema } = require('validator');
var logger = require('../../util/logger');

var getUsersPage = (req,res,next) => {
   logger.info('Home page for users has benn successfully appeared');
   res.send('Users page');
}
var createUser = (req,res,next) => {

   User.create(req.body)
   .then(user => {
      logger.info( 'User with email - ' + `${req.body.email}` + ' is created!')
      res.status(200).send(user)
   })
   .catch(
      showError404,
      logger.error('Failed to add user.')
   )
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
         logger.info('Successfully taken user by name ' + `${name2}`)
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
exports.userComponents = {
    getUsersPage,
    createUser,
    getAllUsers,
    getUserByName,
    removeUserByName,
    updateUser,
    updateOrCreate,
    findAndUpdateUser,
    showError404
}