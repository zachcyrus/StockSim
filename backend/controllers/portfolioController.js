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