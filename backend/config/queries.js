let findIndvStockVals = `
SELECT Portfolios.portfolio_name, SUM(transactions.quantity * transactions.price) 
AS totalPrice, transactions.stock_name
FROM  portfolios
INNER JOIN Transactions ON Portfolios.portfolio_id=Transactions.portfolio_id
WHERE (user_id = $1)
GROUP BY transactions.stock_name, Portfolios.portfolio_name
`

let totalPriceOfPort = `
SELECT Portfolios.portfolio_name, SUM(transactions.quantity * transactions.price) 
AS totalPrice
FROM  portfolios
INNER JOIN Transactions ON Portfolios.portfolio_id=Transactions.portfolio_id
WHERE (user_id = $1)
GROUP BY portfolios.portfolio_name
`

let betterWeightedVal = `
SELECT Portfolios.portfolio_name, ROUND(SUM(transactions.quantity * transactions.price)/SUM(transactions.quantity),3)
    AS weightedAvg, 
	transactions.stock_name, SUM(transactions.quantity) AS quantity, 
	MIN(transactions.date_of_sale) AS firstPurchase
    FROM  portfolios
    INNER JOIN Transactions ON Portfolios.portfolio_id=Transactions.portfolio_id
    WHERE (user_id = 14 AND portfolio_name = 'First Port')
    GROUP BY transactions.stock_name, Portfolios.portfolio_name

`

let newWeightVal =
    `
SELECT Portfolios.portfolio_name, ROUND(SUM(transactions.quantity * transactions.price)/SUM(transactions.quantity),3)
    AS weightedAvg, 
	transactions.stock_name, SUM(transactions.quantity) AS quantity, 
	MIN(transactions.date_of_sale) AS firstPurchase,
	SUM(transactions.quantity) + SUM(transactions.sell_quantity) AS totalQuant
    FROM  portfolios
    INNER JOIN Transactions ON Portfolios.portfolio_id=Transactions.portfolio_id
    WHERE (user_id = $1 AND portfolio_name = $2)
    GROUP BY transactions.stock_name, Portfolios.portfolio_name
`