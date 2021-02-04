const pool = require('../db/index')

//Goals: Functions to add portfolios to authenticated users

//addPortfolio() will create a new portfolio in the database for selected user
exports.addPortfolio = async (req, res) => {
    let portfolioName = req.body.portfolioName;
    let currUserId = req.user.Id;

    //first checkDatabase if there is a portfolio with that name
    let findPortQuery = `
    SELECT portfolio_name
    FROM  portfolios
    WHERE (user_id = $1 AND portfolio_name = $2)
    `

    let findPortVals = [currUserId, portfolioName]

    let findPortfolio = await pool.query(findPortQuery, findPortVals)

    //if no values are returned we insert the portfolio
    if (findPortfolio.rows.length === 0) {
        let addPortQuery = `
        INSERT INTO portfolios(portfolio_name, user_id)
        VALUES($1, $2)
        RETURNING portfolio_name
        `
        let addPortVals = [portfolioName, currUserId]

        try {
            let addNewPortfolio = await pool.query(addPortQuery, addPortVals)
            console.log('adding portfolio')
            return res.json(addNewPortfolio.rows[0])

        } catch (err) {
            console.log(err)
            alert(err)
        }

    }

    //Else return that portfolio was already added
    else {
        console.log('Theres a portfolio with the name already')
        return res.json({
            message: `${portfolioName} was already found in the database`
        })
    }

}

exports.getPortfolios = async (req, res) => {
    let currUserId = req.user.Id;

    let findAllPortfolios = `
    SELECT portfolio_name
    FROM  portfolios
    WHERE (user_id = $1)
    `
    try {
        let foundPortfolios = await pool.query(findAllPortfolios, [currUserId])
        console.log('finding portfolios')
        return res.json(foundPortfolios.rows)

    } catch (err) {
        console.log(err)
        alert(err)
        return res.json(err)
    }
}

exports.getPortfoliosVal = async (req, res) => {
    let currUserId = req.user.Id;

    //this is a query to the total price paid for individual stocks in portfolio
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

    //the following query is to obtain the weighted avg of each stock, we can compare this value
    //on the frontend api call to determine percent increase or decrease
    //only problem is that as portfolio grows the number of api calls will increase
    let stockWeightedAvgQuery = `
    SELECT Portfolios.portfolio_name, ROUND(SUM(transactions.quantity * transactions.price)/SUM(transactions.quantity),3)
    AS weightedAvg, transactions.stock_name
    FROM  portfolios
    INNER JOIN Transactions ON Portfolios.portfolio_id=Transactions.portfolio_id
    WHERE (user_id = $1)
    GROUP BY transactions.stock_name, Portfolios.portfolio_name
    `

    let foo = await pool.query(findIndvStockVals, [currUserId])
}

//840 / 6 = 140 
//445.8 + 260.9 = 706.7 avg price is 117.783
//avg % increase is 18.846
//weighted share price = ( (first prise * shares) + (second price * shares) )/total number of shares