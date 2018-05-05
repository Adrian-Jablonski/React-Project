// This file is only for updating the expensecategory SQL table. Copy and paste it into any page that has a button to run it.

router.post('/', function(req,res) {
    var categoryFile = require("../data/expenseCategories.json");

    var categoryLen = categoryFile.length;
    console.log(categoryLen);
    for (var i = 0; i < categoryLen; i++) {
        var category = categoryFile[i]["category"];
        var subCategory = categoryFile[i]["subcategory"];
        var type = categoryFile[i]["type"];

        db.none('INSERT INTO expensecategories(category, subcategory, type) values($1, $2, $3)',[category, subCategory, type]).catch(function(){});

    }
})