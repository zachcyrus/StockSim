const pool = require('../db/index')
const axios = require('axios');

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

exports.getPortfoliosWeightedVal = async (req, res) => {
    let currUserId = req.user.Id;
    let currPortfolioName = req.params.portfolioName

    //the following query is to obtain the weighted avg of each stock, we can compare this value
    //w/ api call to determine percent increase or decrease
    //only problem is that as portfolio grows the number of api calls will increase
    let stockWeightedAvgQuery = `
    SELECT Portfolios.portfolio_name, ROUND(SUM(transactions.quantity * transactions.price)/SUM(transactions.quantity),3)
    AS weightedAvg, 
	transactions.stock_name, SUM(transactions.quantity) AS quantity, 
	MIN(transactions.date_of_sale) AS firstPurchase,
	SUM(transactions.quantity) + SUM(transactions.sell_quantity) AS totalQuantity
    FROM  portfolios
    INNER JOIN Transactions ON Portfolios.portfolio_id=Transactions.portfolio_id
    WHERE (user_id = $1 AND portfolio_name = $2)
    GROUP BY transactions.stock_name, Portfolios.portfolio_name
    `

    try {
        let weightedAvg = await pool.query(stockWeightedAvgQuery, [currUserId, currPortfolioName])
        let paramsHolder = [];
        weightedAvg.rows.forEach(row => {
            if (!paramsHolder.includes(row.stock_name)) {
                paramsHolder.push(row.stock_name)
            }
        })

        if (weightedAvg.rows.length === 0) {
            return res.json({
                error: 'No portfolio with name exists for user'
            })
        }




        //this api currently returning the previous day value of selected stocks
        let previousDayStockPrices = await axios.get(`${process.env.IEX_TEST_URL}/stable/stock/market/batch`, {
            params: {
                symbols: paramsHolder.toString(),
                types: 'previous',
                chartCloseOnly: true,
                token: process.env.IEX_TOKEN
            }
        })

        previousDayStockPrices = previousDayStockPrices.data;


        let currWeightedAvgValues = weightedAvg.rows.map(row => {
            let latestValue = previousDayStockPrices[row.stock_name].previous.close * row.totalQuantity;
            latestValue = latestValue.toFixed(2);
            let weightedCost = (row.weightedavg * row.quantity);
            let percentIncOrDec = ((latestValue - weightedCost) / weightedCost) * 100
            return {
                ...row,
                latestValue,
                percentIncOrDec,
                weightedCost
            }
        })

        return res.json(currWeightedAvgValues)

    } catch (err) {
        console.log('err getting weighted avg')
        return res.json(err)

    }

}

//function to retrieve allStocks and their amounts from a specific portfolio
exports.getPortfolioStocks = async (req, res) => {
    let userId = req.user.Id;
    console.log('running')
    let { portfolioName } = req.params
    console.log(portfolioName)
    let getPortAndStocksQuery =
        `
    SELECT Portfolios.portfolio_name, transactions.stock_name, 
    SUM(transactions.quantity) + SUM(transactions.sell_quantity) AS totalAmount, 
    ROUND(SUM(transactions.quantity * transactions.price)/SUM(transactions.quantity),3) AS weightedAvg, 
    MIN(transactions.date_of_sale) AS firstPurchase
    FROM  portfolios
    INNER JOIN Transactions ON Portfolios.portfolio_id=Transactions.portfolio_id
    WHERE (user_id = $1 AND portfolio_name = $2)
	GROUP BY Portfolios.portfolio_name, transactions.stock_name

    `

    let values = [userId, portfolioName]

    try {
        let findPortfolioStocks = await pool.query(getPortAndStocksQuery, values)
        if (findPortfolioStocks.rows.length === 0) {
            console.log('portfolio not found or no stocks in portfolio')
            return res.json({
                error: "No stock in portfolio or portfolio doesn't exist"
            })
        }
        else {
            console.log('Portfolio found and is being returned')
            return res.json(findPortfolioStocks.rows)
        }

    } catch (err) {
        console.log(err)
        return res.json(err)

    }
}

//This function isn't used at the moment, plan to use this date for line graph in future
exports.graphPortfolioStocks = async (req, res) => {
    let userId = req.user.Id;
    console.log('running graph')
    let { portfolioName } = req.params
    console.log(portfolioName)
    let getPortAndStocksQuery =
        `
    SELECT Portfolios.portfolio_name, ROUND(SUM(transactions.quantity * transactions.price)/SUM(transactions.quantity),3)
    AS weightedAvg, transactions.stock_name, 
	CAST(transactions.date_of_sale AS DATE), transactions.quantity
    FROM  portfolios
    INNER JOIN Transactions ON Portfolios.portfolio_id=Transactions.portfolio_id
    WHERE (user_id = $1 AND portfolio_name = $2)
    GROUP BY transactions.stock_name, Portfolios.portfolio_name, transactions.date_of_sale,transactions.quantity

    `

    let values = [userId, portfolioName]

    try {
        let findPortfolioStocks = await pool.query(getPortAndStocksQuery, values)
        if (findPortfolioStocks.rows.length === 0) {
            console.log('portfolio not found or no stocks in portfolio')
            return res.json({
                error: "No stock in portfolio or portfolio doesn't exist"
            })
        }
        else {
            console.log('Portfolio found and is being returned')
            return res.json(findPortfolioStocks.rows)
        }

    } catch (err) {
        console.log(err)
        return res.json(err)

    }



}

exports.allPortfolioValues = async (req, res) => {
    let userId = req.user.Id;

    let allPortfolioValuesQuery =
        `
    SELECT Portfolios.portfolio_name,  ROUND(SUM(transactions.quantity * transactions.price)/SUM(transactions.quantity),3)
    AS weightedAvg, transactions.stock_name, SUM(transactions.quantity) AS quantity,
    SUM(transactions.quantity) + SUM(transactions.sell_quantity) AS totalQuant
    FROM  portfolios
    INNER JOIN Transactions ON Portfolios.portfolio_id=Transactions.portfolio_id
    WHERE (user_id = $1)
    GROUP BY portfolios.portfolio_name, transactions.stock_name, Portfolios.portfolio_name
    `
    try {
        let foundPortfolios = await pool.query(allPortfolioValuesQuery, [userId])
        foundPortfolios = foundPortfolios.rows;
        if (foundPortfolios.length === 0) {
            return res.json(undefined)
        }

        //find the params we need for GET request
        let paramsHolder = [];
        foundPortfolios.forEach(row => {
            if (!paramsHolder.includes(row.stock_name)) {
                paramsHolder.push(row.stock_name)
            }
        })


        //this api currently returning the previous day value of selected stocks
        let previosDayStockPrices = await axios.get(`${process.env.IEX_TEST_URL}/stable/stock/market/batch`, {
            params: {
                symbols: paramsHolder.toString(),
                types: 'previous',
                chartCloseOnly: true,
                token: process.env.IEX_TOKEN


            }
        })

        previosDayStockPrices = previosDayStockPrices.data;

        let newPortfolioArr = foundPortfolios.map(row => {

            let latestPrice = previosDayStockPrices[row.stock_name].previous.close;
            let updatedRow = {
                portfolio_name: row.portfolio_name,
                latestValue: row.totalQuant * latestPrice,
                quantity: row.totalQuant
            }
            return updatedRow;
        })


        let finalArr = newPortfolioArr.reduce((acc, obj) => {
            var existItem = acc.find(item => item.portfolio_name === obj.portfolio_name);
            if (existItem) {
                existItem.latestValue += obj.latestValue;
                return acc;
            }
            acc.push(obj);
            return acc;
        }, []);


        return res.json(finalArr);




    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

//function to retrieve a specific stock from all portfolios and see their values
exports.findStockInAllPortfolios = async (req, res) => {
    let userId = req.user.Id;

    let stock_name = req.params.ticker.toUpperCase();


    let findAllStocksQuery =
        `
    SELECT Portfolios.portfolio_name,  ROUND((SUM(transactions.quantity) * SUM(transactions.price))/SUM(transactions.quantity),3)
    AS weightedAvg, transactions.stock_name, SUM(transactions.quantity) AS quantity, MIN(CAST(transactions.date_of_sale AS DATE)) AS firstPurchase
    FROM  portfolios
    INNER JOIN Transactions ON Portfolios.portfolio_id=Transactions.portfolio_id
    WHERE (user_id = $1 AND stock_name = $2)
    GROUP BY portfolios.portfolio_name, transactions.stock_name, Portfolios.portfolio_name
    `

    try {
        let foundPorts = await pool.query(findAllStocksQuery, [userId, stock_name])
        foundPorts = foundPorts.rows;

        let previousDayStockPrices = await axios.get(`${process.env.IEX_TEST_URL}/stable/stock/${stock_name}/previous`, {
            params: {
                token: process.env.IEX_TOKEN
            }
        })

        //now to find the latest price of the stock using iex
        previousDayStockPrices = previousDayStockPrices.data;
        let portWithLatestPrices = foundPorts.map(row => {
            return { ...row, currentValue: (row.quantity * previousDayStockPrices.close).toFixed(2) }
        })
        return res.json(portWithLatestPrices)

    } catch (err) {
        console.log(err)
        res.json(err)
    }

}

//840 / 6 = 140 
//445.8 + 260.9 = 706.7 avg price is 117.783
//avg % increase is 18.846
//weighted share price = ( (first prise * shares) + (second price * shares) )/total number of shares