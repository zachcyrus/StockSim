const pool = require('../db/index')

//purpose of function is to purchase and add a stock to a specific portfolio
//The frontend will send the quantity, price, and stock_name to server
exports.buyStock = async (req, res) => {
    //first we gotta locate the portfolio we want to add

    let { portfolioName, quantity, price, stockName } = req.body

    let findPortIdQuery = `
    SELECT portfolio_id
    FROM  portfolios
    WHERE (user_id = $1 AND portfolio_name = $2)
    `
    let findPortIdValues = [req.user.Id, portfolioName]

    try {
        let foundPortfolio = await pool.query(findPortIdQuery, findPortIdValues)
        //if portfolio is not found
        if (foundPortfolio.rows.length === 0) {
            console.log(`${portfolioName} was not found`)
            return res.json({
                message: `${portfolioName} was not found for user`
            })

        }
        //portfolio is found add stock to transactions table
        else {
            console.log(`${portfolioName} was found for user`)
            console.log(foundPortfolio.rows[0])

            let portId = foundPortfolio.rows[0].portfolio_id


            let addStockQuery = `
            INSERT INTO transactions(buy_sell, portfolio_id, quantity, price, stock_name, date_of_sale, sell_quantity, sell_price)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
            `

            let addStockVal = ['buy', portId, quantity, price, stockName, new Date(), 0, 0]

            try {
                let purchasedStock = await pool.query(addStockQuery, addStockVal)
                return res.json(purchasedStock.rows[0])
            } catch (err) {
                console.log(err)
            }

        }

    } catch (err) {
        console.log(err)

    }

}

//funtion to sell a stock exactly the same as buyStock when change the query into sell
exports.sellStock = async (req, res) => {
    //first we gotta locate the portfolio we want to add

    let { portfolioName, quantity, price, stockName } = req.body
    //price here is sell price

    let findPortIdQuery = `
    SELECT portfolio_id
    FROM  portfolios
    WHERE (user_id = $1 AND portfolio_name = $2)
    `
    let findPortIdValues = [req.user.Id, portfolioName]

    try {
        let foundPortfolio = await pool.query(findPortIdQuery, findPortIdValues)
        //if portfolio is not found
        if (foundPortfolio.rows.length === 0) {
            console.log(`${portfolioName} was not found`)
            return res.json({
                message: `${portfolioName} was not found for user`
            })

        }
        //portfolio is found add stock to transactions table
        else {
            console.log(`${portfolioName} was found for user`)

            let portId = foundPortfolio.rows[0].portfolio_id

            let addStockQuery = `
            INSERT INTO transactions(buy_sell, portfolio_id, quantity, price, stock_name, date_of_sale, sell_price, sell_quantity)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *
            `

            let addStockVal = ['sell', portId, 0, 0, stockName, new Date(), price, quantity*-1]

            try {
                let purchasedStock = await pool.query(addStockQuery, addStockVal)
                return res.json(purchasedStock.rows[0])
            } catch (err) {
                console.log(err)
            }

        }

    } catch (err) {
        console.log(err)

    }


}

exports.getFirstPurchaseDate = async (req, res) => {
    let userId = req.user.Id
    let { stockTicker } = req.params

    let firstPurchaseDateQuery =
        `
    SELECT portfolios.portfolio_name, transactions.stock_name, transactions.quantity, transactions.price, transactions.date_of_sale
    FROM  portfolios
    INNER JOIN Transactions ON Portfolios.portfolio_id=Transactions.portfolio_id
    WHERE (user_id = $1 AND stock_name = $2 )

    `
    console.log(stockTicker)
    try {
        console.log(stockTicker)
        let foundPurchaseDate = await pool.query(firstPurchaseDateQuery, [userId, stockTicker])
        if (foundPurchaseDate.rows.length === 0) {
            console.log(`Stock not found`)
            return res.json(false)

        }
        //stock with that name was found for that user
        //return first row with date 
        //possible error because it shows first purchase date regardless of portfolio
        else {
            console.log(`stock was found`)
            return res.json(foundPurchaseDate.rows[0].date_of_sale)
        }

    } catch (err) {
        console.log(err)
        res.json({
            message: err
        })
    }


}