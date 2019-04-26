
const Singer = require('../models/singer.js');
const logger = require('../logger');


module.exports.getAllSingers = (req, res, next) => {

    Singer.find().then(function(singers){
      console.log(singers);
    logger.info('Show all singers requested '); 
      res.send(singers);
      logger.info('All singers shown '); 
     }).catch(function (err) {
      logger.error('Show all singers failed'); 
      res.status(404).send("Cannot find singers");
    })
};

module.exports.getSingerByName = (req, res, next) => {
  logger.info('Show singer by name requested'); 
        let nameSinger = req.params.name;
        Singer.find({name: nameSinger}).then(function(singer){
          console.log(singer);
          logger.info('Shown singer by name'); 
          if(singer.length<1){
            res.status(404).send("Cannot find singer");
          }else{
      
            res.send(singer);
          }
        }).catch(function (err) {
          console.log(err);
          res.status(404).send("Cannot find singer");
        });
};

module.exports.deleteSingerByID = (req, res, next) =>{
  logger.info('Delete single singer requested'); 
    let nameSinger = req.params.name;
    Singer.remove({name: nameSinger}).then(function(singer){
      console.log(singer);
      if(singer.deletedCount<1){
        res.status(404).send("Cannot find singer");
      }else{
  
        res.send(singer);
      }
    }).catch(function (err) {
      console.log(err);
      res.status(404).send("Cannot find singer");
    });
    
  };

  module.exports.createSinger = (req, res) => {
    logger.info('Create new singer requested'); 
    console.log('You made a POST request: ', req.body);
    Singer.create(req.body)
    .then(function(singer){
        res.send(singer);
    }).catch(function (err) {
      
      res.status(404).send("Cannot add singer");
    })
    ;
    
  };

  module.exports.updateSinger = (req, res) => {
    logger.info('Update singer requested at'); 
    console.log('You made a UPDATE request: ', req.body);
    Singer.updateOne({_id: req.body._id} ,req.body)
    .then(function(singer){
      if(singer.nModified<1){
        res.status(404).send("singer is not modified");
      }else{
  
        res.send(singer);
      }
    }).catch(function (err) {
      
      res.status(404).send("Cannot update singer => " + err);
    })
    ;
    
  };

 
  
module.exports.getAllUsers = (req, res, next) => {

  User.find().then(function(users){
    console.log(users);
  logger.info('Show all users requested '); 
    res.send(users);
   }).catch(function (err) {
    logger.error('Show all users failed'); 
    res.status(404).send("Cannot find users");
  })
};

module.exports.createUser = (req, res) => {
  logger.info('Create new user requested'); 
  console.log('You made a POST request: ', req.body);
  User.create(req.body)
  .then(function(user){
      res.send(user);
  }).catch(function (err) {
    
    res.status(404).send("Cannot add user");
  })
  ;
  
};