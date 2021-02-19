const pool = require('../db/index')
const axios = require('axios');
//purpose of function is to purchase and add a stock to a specific portfolio
//The frontend will send the quantity, price, and stock_name to server
exports.buyStock = (timeTravel) => {
    return async (req, res) => {
        //condition to check if this is a time travel purchase
        let date = timeTravel ? new Date(req.body.date) : new Date()

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

                let addStockVal = ['buy', portId, quantity, price, stockName, date, 0, 0]

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
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
            `

            let addStockVal = ['sell', portId, 0, 0, stockName, new Date(), price, quantity * -1]

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


// this function is meant to use IEX cloud api to retrieve the closing stock price from a specific date
// this is a rather expensive function in that it constantly sends a get request to get a specific date
// might be easier to make a call that contains a year worth of data;
// Client-side has to restrict user from inputting a date that is the weekend; 
exports.timeTravelQuote = async (req, res) => {
    console.log('running')
    let { stockTicker, date } = req.params

    try {
        let specificDayStockPrice = await axios.get(`${process.env.IEX_TEST_URL}/stable/stock/${stockTicker}/chart/date/${date}`, {
            params: {
                chartCloseOnly: true,
                chartByDay: true,
                token: process.env.IEX_TOKEN
            }
        })
        
        let selectedDayPrice = specificDayStockPrice.data[0].close;
        return res.json({
            price: selectedDayPrice
        })

    } catch (err) {
        console.log(err)

    }



}