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
            INSERT INTO transactions(buy_sell, portfolio_id, quantity, price, stock_name, date_of_sale)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *
            `

            let addStockVal = ['buy', portId, quantity, price, stockName, new Date()]

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
            INSERT INTO transactions(buy_sell, portfolio_id, quantity, price, stock_name, date_of_sale)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *
            `

            let addStockVal = ['sell', portId, quantity, price, stockName, new Date()]

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