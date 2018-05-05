var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var myDatabase = require('../util/database.js');

var db = myDatabase.database;

router.get('/', function(req, res, next) {
    db.any(`SELECT subcategory FROM expensecategories GROUP BY subcategory ORDER BY subcategory`).then(function (subcategoryData) {
          res.json(subcategoryData);
          console.log(subcategoryData);
      })
  });

router.post('/', function(req, res, next) {
    var category = req.body.category;
    // var category = "Auto"
    db.any(`SELECT subcategory FROM expensecategories WHERE category = $1 GROUP BY subcategory, category ORDER BY subcategory`,[category]).then(function (subcategoryData) {
        res.json(subcategoryData);
        console.log(subcategoryData);
    })
});

module.exports = router;