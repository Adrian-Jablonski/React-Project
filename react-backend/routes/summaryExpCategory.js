var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var myDatabase = require('../util/database.js');

var db = myDatabase.database;

router.get('/', function(req, res, next) {
    // var category = req.params.category;
    db.any(`SELECT category, SUM(amount) AS total FROM expenses GROUP BY category ORDER BY total desc`).then(function (summaryExpCategory) {
        res.json(summaryExpCategory);
        console.log(summaryExpCategory);
    })
});

// router.post('/expenseSubcategories/:category', function(req, res, next) {
//     var category = req.params.category;
//     console.log("Post Param:", category)
//     db.any(`SELECT subcategory FROM expensecategories WHERE category = $1 GROUP BY subcategory, category ORDER BY subcategory`,[category]).then(function (subcategoryData) {
//         res.json(subcategoryData);
//         console.log(subcategoryData);
//     })
// });

module.exports = router;