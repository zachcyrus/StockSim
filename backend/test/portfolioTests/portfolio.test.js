//File to test portfolioController Functions
const request = require("supertest");
const jwt = require('jsonwebtoken')
const app = require('../../app');
const { expectCt } = require("helmet");

const testUser = {
    Username: process.env.TEST_USER,
    Id: process.env.TEST_ID
}
const token = jwt.sign({ user: testUser }, process.env.JWT_SECRET, { expiresIn: '1m' })
const jwtCookie = `jwt=${token};`

describe('Am I using Jest Correctly', () => {
    test('Testing Index', async () => {
        let response = await request(app).get('/test')
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Test should work')
    })
})


describe('Portfolio Controller Functions', () => {

    test('Index should return all portfolios from User', async () => {
        let response = await request(app)
            .get('/portfolios')
            .set('Cookie', [jwtCookie])
        console.log(response.body)
        expect(response.status).toBe(200)

    })
})

