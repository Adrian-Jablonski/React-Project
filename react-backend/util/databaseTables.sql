CREATE TABLE userinfo (
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR,
    balance DECIMAL
);

INSERT INTO userinfo (username, balance) VALUES ('Adrian', 10000);

CREATE TABLE expenses (
    id SERIAL NOT NULL PRIMARY KEY,
    userid int,
    category VARCHAR,
    subcategory VARCHAR,
    amount DECIMAL,
    paymenttype VARCHAR,
    expensedate DATE
);

CREATE TABLE expenseCategories (
    id SERIAL NOT NULL PRIMARY KEY,
    category VARCHAR,
    subcategory VARCHAR,
    type VARCHAR
);

INSERT INTO expenses (userid, category, subcategory, amount, paymenttype, expensedate) VALUES (1, 'Food', 'Groceries', 23, 'Cash', '05/05/2018');

-- Gets summary by category
SELECT category, SUM(amount) FROM expenses 
GROUP BY category
ORDER BY category

-- Gets sum of all expenses
SELECT SUM(amount) FROM expenses

-- Calculates user balance based on start balance and expenses
SELECT (userinfo.balance - SUM(expenses2.amount)) AS total FROM expenses2
INNER JOIN userinfo
ON userinfo.id = expenses2.userid
GROUP BY userinfo.balance