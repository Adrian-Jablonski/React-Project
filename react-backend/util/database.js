var promise = require('bluebird');
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/expense_tracker';
var db = pgp(connectionString);

var options = {
    promiseLib : promise
}

exports.database = db;