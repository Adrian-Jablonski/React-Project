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

CREATE TABLE incomeCategories (
    id SERIAL NOT NULL PRIMARY KEY,
    category VARCHAR
);

INSERT INTO expenses (userid, category, subcategory, amount, paymenttype, expensedate) VALUES (1, 'Food', 'Groceries', 23, 'Cash', '05/05/2018');

INSERT INTO income (userid, category, amount, incomedate) VALUES (1, 'Paycheck', '2000', '05/05/2018');

-- Gets summary by category
SELECT category, SUM(amount) FROM expenses 
GROUP BY category
ORDER BY category

-- Gets sum of all expenses
SELECT SUM(amount) FROM expenses

-- Calculates user balance based on start balance and expenses
SELECT userinfo.username, (userinfo.balance - SUM(expenses.amount)) AS balance FROM expenses
INNER JOIN userinfo
ON userinfo.id = expenses.userid
GROUP BY userinfo.username, userinfo.balance

-- Calculates user expense summary by category
SELECT category, SUM(amount) AS total FROM expenses
GROUP BY category
ORDER BY total desc

-- Calculates user expense summary by subcategory
SELECT category, subcategory, SUM(amount) AS total FROM expenses
GROUP BY category, subcategory
ORDER BY total desc