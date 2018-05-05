var express = require('express');
var router = express.Router();
var promise = require('bluebird');
var bodyParser = require('body-parser');

var myDatabase = require('../util/database.js');

var db = myDatabase.database;

// var options = {
//     promiseLib : promise
// }

router.get('/', function(req, res) {
    console.log("Form Submitted")
      
  });

router.post('/', function(req,res) {
    console.log(req);
    var category = req.body.category;
    var subcategory = req.body.subcategory;
    var amount = req.body.amount;
    var type = req.body.type;

    db.none(`INSERT INTO expenses(category, subcategory, amount, paymenttype) VALUES ($1, $2, $3, $4)`,[category, subcategory, amount, type]);
    
})


module.exports = router;