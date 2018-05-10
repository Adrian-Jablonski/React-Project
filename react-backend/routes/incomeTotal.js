var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var myDatabase = require('../util/database.js');

var db = myDatabase.database;

router.get('/', function(req, res, next) {
    // var category = req.params.category;
    db.any(`SELECT userid, sum(income.amount) AS totalIncome FROM income GROUP BY userid`).then(function (incTotal) {
        res.json(incTotal[0]["totalincome"]);  // using expTotal[0]["totalexpense"] to get to the expense only
        // console.log(summaryExpCategory);
    })
});

module.exports = router;