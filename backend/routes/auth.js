const passport = require('passport')
require('../config/passport')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()
const pool = require('../db/index')


//Route for authentication with fb login, will add more login strategies in the future;

router.get('/facebook', passport.authenticate('facebook'))


//Most likely sign a jwt token on callback
router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), (req, res) => {
    //Generate JWT after successful callback
    //const token = jwt.sign({})
    let currUser = req.user;
    // If in production mode cookie and jwt expires in 7 days, else one hour
    const expiration = process.env.NODE_ENV === 'production' ? 1440 * 60000 : 60 * 60000;

    const token = jwt.sign({ user: currUser }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + expiration),
        secure: process.env.NODE_ENV === 'production',

        httpOnly: true
    })
    res.redirect('http://localhost:3000')

})

//Route for authentication with google login

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))


router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    //Generate JWT after successful callback
    //const token = jwt.sign({})
    let currUser = req.user;
    // If in production mode cookie and jwt expires in 7 days, else one hour
    const expiration = process.env.NODE_ENV === 'production' ? 1440 * 60000 : 60 * 60000;

    const token = jwt.sign({ user: currUser }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + expiration),
        secure: process.env.NODE_ENV === 'production',

        httpOnly: true
    })
    res.redirect('http://localhost:3000')

})

//Rotue for guest user authentication 

router.get('/guest/', async (req, res) => {
    if (req.cookies['jwt']) {
        return res.json({
            error: 'Already signed in'
        })
    }

    let findGuestQuery =
    `
    SELECT "Username", "Id"
    FROM stock_users
    WHERE("Id" = 16)
    `

    try {
        let foundGuest = await pool.query(findGuestQuery)
        //expires in 30 minutes
        const expiration = 30 * 60000;

        const token = jwt.sign({ user: foundGuest.rows[0] }, process.env.JWT_SECRET, { expiresIn: '30m' })
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + expiration),
            secure: process.env.NODE_ENV === 'production',

            httpOnly: true
        })
        return res.json({
            message: 'Guest logged in'
        })

    } catch (err) {
        console.log(err)

    }



})

router.get('/logout/', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('jwt')
    return res.json({
        message: 'Logged Out'
    })
})



module.exports = router