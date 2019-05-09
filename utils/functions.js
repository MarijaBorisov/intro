const Singer = require('../models/singer.js');
const User = require('../models/user.js');
const logger = require('../logger');
const bcrypt = require("bcrypt");
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


module.exports.getSingerNames = (req, res, next) => {

  Singer.aggregate(
    [
      { $project: { lastname:1 } }
    ]
  )
    .then(function (singers) {
 
      logger.info("Listing singers... ");
      res.send(singers);
 
    }).catch(function (err) {
     
      res.status(404).send("Cannot find singers");
    })
 };


 module.exports.getSingerNotEqualTo = (req, res, next) => {

  Singer.aggregate(
    [
      { $match: { lastname: { $ne: 'Puente' } } },
      { $project: { lastname:1 } }
    ]
  )
    .then(function (singers) {
 
      logger.info("Listing singers... ");
      res.send(singers);
 
    }).catch(function (err) {
     
      res.status(404).send("Cannot find singers");
    })
 };


 module.exports.getSingerBlankName = (req, res, next) => {

  Singer.aggregate(
    [
      
      { $project: { name: { $cond: { if: { $eq: ["$name", 'Armando'] }, then: '  ', else: '$name' } } } }
    ]
  )
    .then(function (singers) {
 
      logger.info("Listing singers... ");
      res.send(singers);
 
    }).catch(function (err) {
     
      res.status(404).send("Cannot find singers");
    })
 };


module.exports.signUpUser = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                logger.info("User validaton passed");
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                logger.error("User validaton didnt pass");
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};


module.exports.Login=(req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length < 1) {
        logger.error('Auth failed'); 
        return res.status(401).json({
          message: "Auth failed"
          
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          logger.error('Auth failed'); 
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        logger.error('Auth failed'); 
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};





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
      console.log(err);
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