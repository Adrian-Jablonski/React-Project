var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var myDatabase = require('../util/database.js');

var db = myDatabase.database;

router.get('/', function(req, res, next) {
  db.any(`SELECT category FROM expensecategories GROUP BY category ORDER BY category`).then(function (categoryData) {
        res.json(categoryData);
        console.log(categoryData);
    })
});

module.exports = router;