var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var myDatabase = require('../util/database.js');

var db = myDatabase.database;

router.get('/', function(req, res, next) {
  db.any(`SELECT * FROM userinfo`).then(function (userData) {
        res.json(userData);
        console.log(userData);
    })
});

module.exports = router;