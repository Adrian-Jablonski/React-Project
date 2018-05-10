var express = require('express');
var router = express.Router();
var promise = require('bluebird');
var bodyParser = require('body-parser');

var myDatabase = require('../util/database.js');

var db = myDatabase.database;

router.get('/', function(req, res) {
    console.log("Form Submitted")
      
  });

router.post('/', function(req,res) {
    // console.log(req);
    var userid = 1
    var category = req.body.category;
    var amount = req.body.amount;
    var incdate = req.body.incdate;

    db.none(`INSERT INTO income (userid, category, amount, incomedate) VALUES ($1, $2, $3, $4)`,[userid, category, amount, incdate]);
    
})


module.exports = router;