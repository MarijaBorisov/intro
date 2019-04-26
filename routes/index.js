var express = require('express');
var router = express.Router();
const functions = require('../utils/functions')





router.get('/singers', functions.getAllSingers );
router.get('/singers/:name', functions.getSingerByName);
router.delete('/singers/:name', functions.deleteSingerByID);
router.post('/singers', functions.createSinger);
router.put('/singers', functions.updateSinger);

router.get("/users", functions.getAllUsers);
router.post('/users', functions.createUser);


module.exports = router;
