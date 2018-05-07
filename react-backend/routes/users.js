var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var myDatabase = require('../util/database.js');

var db = myDatabase.database;

// router.get('/', function(req, res, next) {
//   db.any(`SELECT * FROM userinfo`).then(function (userData) {
//         res.json(userData);
//         console.log(userData);
//     })
// });

router.get('/', function(req, res, next) {
    db.any(`SELECT userinfo.username, (userinfo.balance - SUM(expenses.amount)) AS balance FROM expenses INNER JOIN userinfo ON userinfo.id = expenses.userid GROUP BY userinfo.username, userinfo.balance`).then(function (userData) {
          res.json(userData);
          console.log(userData);
      })
  });

module.exports = router;