const passport = require('passport')
require('../config/passport')
const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController')

//This route will check if a portfolio name exists, if not it will add a new portfolio
router.post('/add', passport.authenticate('jwt', {session:false}), portfolioController.addPortfolio)

//Need a route to delete a portfolio

//route to retrieve all portfolios
router.get('/', passport.authenticate('jwt', {session:false}), portfolioController.getPortfolios)

module.exports = router