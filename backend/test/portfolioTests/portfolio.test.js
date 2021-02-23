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


describe('Am I using Jest Correctly', () => {
    test('Testing Index', async (done) => {
        let response = await request(app).get('/test')
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Test should work')
        done()
    })
})


describe('Portfolio Controller Functions', () => {

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

})

