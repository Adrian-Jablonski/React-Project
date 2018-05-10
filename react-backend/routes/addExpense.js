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
    var subcategory = req.body.subcategory;
    var amount = req.body.amount;
    var type = req.body.type;
    var expdate = req.body.expdate;

    db.none(`INSERT INTO expenses(userid, category, subcategory, amount, paymenttype, expensedate) VALUES ($1, $2, $3, $4, $5, $6)`,[userid, category, subcategory, amount, type, expdate]);
    
})


module.exports = router;