var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var myDatabase = require('../util/database.js');

var db = myDatabase.database;

router.get('/', function(req, res, next) {
    // var category = req.params.category;
    db.any(`SELECT category, SUM(amount) AS total FROM income GROUP BY category ORDER BY total desc`).then(function (summaryIncome) {
        res.json(summaryIncome);
        // console.log(summaryExpCategory);
    })
});

module.exports = router;