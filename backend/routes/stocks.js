const passport = require('passport')
require('../config/passport')
const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController')

//Route for buying a specific stock adding to a portfolio
router.post('/buy', passport.authenticate('jwt', {session:false}), stockController.buyStock)

//Route for 'selling' a stock and tracking that in portfolio
router.post('/sell', passport.authenticate('jwt', {session:false}), stockController.sellStock)


//Need a route to delete a portfolio

module.exports = router