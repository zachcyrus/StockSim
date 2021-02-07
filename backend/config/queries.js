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

