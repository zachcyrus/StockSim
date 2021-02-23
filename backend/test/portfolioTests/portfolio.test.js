//File to test portfolioController Functions
const request = require("supertest");
const jwt = require('jsonwebtoken')
const app = require('../../app');
const { expectCt } = require("helmet");
const pool = require('../../db/index')
const testUser = {
    Username: process.env.TEST_USER,
    Id: process.env.TEST_ID
}
const token = jwt.sign({ user: testUser }, process.env.JWT_SECRET, { expiresIn: '1m' })
const jwtCookie = `jwt=${token};`

afterAll(() => {
    return pool.end();
})

describe('Authenticated Portfolio Routes', () => {
    afterEach(() => {
        let removeTestPortfolio = async () => {
            let findPortQuery = `
            SELECT portfolio_name
            FROM  portfolios
            WHERE (user_id = $1 AND portfolio_name = $2)
            `

            let findPortVals = [testUser.Id, 'SUPERTEST']

            let findPortfolio = await pool.query(findPortQuery, findPortVals)
            if (findPortfolio.rows.length === 0) {
                return;
            }

            else {
                let deleteTestQuery = `
                DELETE FROM portfolios WHERE portfolio_name='SUPERTEST'
                `
                let deleteTestPortfolio = await pool.query(deleteTestQuery)
                return;
            }
        }

        return removeTestPortfolio()
    })

    test('GET /portfolios should return all portfolios from User', async (done) => {
        let response = await request(app)
            .get('/portfolios')
            .set('Cookie', [jwtCookie])
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(6)
        done()

    })

    test('GET /portfolios/allportfoliovalues should return all portfolio names and values from test user', async (done) => {
        let response = await request(app)
            .get('/portfolios/allportfoliovalues')
            .set('Cookie', [jwtCookie])
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(5)
        response.body.forEach((row) => {
            expect(row.portfolio_name).not.toBe(undefined)
        })
        done()
    })

    test('GET /portfolios/allportfolios/AAPL should return all portfolios that contain AAPL from test user', async (done) => {
        let response = await request(app)
            .get('/portfolios/allportfolios/AAPL')
            .set('Cookie', [jwtCookie])
        expect(response.status).toBe(200)
        response.body.forEach((row) => {
            expect(row.portfolio_name).not.toBe(undefined)
            expect(row.currentValue).not.toBe(undefined)
            expect(row.stock_name).toBe('AAPL')
        })
        done()
    })

    test('GET /portfolios/Megaman/piechart should return weighted stock values from portfolio', async (done) => {
        let response = await request(app)
            .get('/portfolios/Megaman/piechart')
            .set('Cookie', [jwtCookie])
        expect(response.status).toBe(200)
        response.body.forEach((row) => {
            expect(row.portfolio_name).not.toBe(undefined)
            expect(row.weightedCost).not.toBe(undefined)
            expect(row.percentIncOrDec).not.toBe(undefined)
        })
        done()
    })

    test('GET /portfolios/userportfolio/Megaman should return stock values from portfolio', async (done) => {
        let response = await request(app)
            .get('/portfolios/userportfolio/Megaman')
            .set('Cookie', [jwtCookie])
        expect(response.status).toBe(200)
        response.body.forEach((row) => {
            expect(row.portfolio_name).not.toBe(undefined)
            expect(row.totalamount).not.toBe(undefined)
            expect(row.weightedavg).not.toBe(undefined)
            expect(row.firstpurchase).not.toBe(undefined)
        })
        done()
    })

    test('POST /portfolios/add should add new portfolio', async (done) => {
        let response = await request(app)
            .post('/portfolios/add/')
            .send({ portfolioName: 'SUPERTEST' })
            .set('Cookie', [jwtCookie])
        expect(response.status).toBe(200)
        expect(response.body.portfolio_name).toBe('SUPERTEST')
        done()
    })


})

