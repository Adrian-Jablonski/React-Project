CREATE TABLE userinfo (
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR,
    balance MONEY
);

CREATE TABLE expenses (
    id SERIAL NOT NULL PRIMARY KEY,
    category VARCHAR,
    subcategory VARCHAR,
    amount DECIMAL,
    paymenttype VARCHAR
);

CREATE TABLE expenseCategories (
    id SERIAL NOT NULL PRIMARY KEY,
    category VARCHAR,
    subcategory VARCHAR,
    type VARCHAR
);

INSERT INTO expenses (category, subcategory, amount, paymenttype) VALUES ('Food', 'Groceries', 23, 'Cash');