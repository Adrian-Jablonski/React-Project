var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var myDatabase = require('../util/database.js');

var db = myDatabase.database;

router.get('/', function(req, res, next) {
    // var category = req.params.category;
    db.any(`SELECT sum(expenses.amount) FROM expenses`).then(function (expTotal) {
        res.json(expTotal);
        // console.log(summaryExpCategory);
    })
});

module.exports = router;