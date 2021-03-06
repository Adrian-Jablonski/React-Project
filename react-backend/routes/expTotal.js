var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var myDatabase = require('../util/database.js');

var db = myDatabase.database;

router.get('/', function(req, res, next) {
    // var category = req.params.category;
    db.any(`SELECT userid, sum(expenses.amount) AS totalExpense FROM expenses GROUP BY userid`).then(function (expTotal) {
        res.json(expTotal[0]["totalexpense"]);  // using expTotal[0]["totalexpense"] to get to the expense only
        // console.log(summaryExpCategory);
    })
});

module.exports = router;