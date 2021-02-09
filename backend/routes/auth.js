const passport = require('passport')
require('../config/passport')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()

//Route for authentication with fb login, will add more login strategies in the future;

router.get('/facebook', passport.authenticate('facebook'))


//Most likely sign a jwt token on callback
router.get("/facebook/callback", passport.authenticate("facebook", {session:false}), (req, res) => {
    //Generate JWT after successful callback
    //const token = jwt.sign({})
    let currUser = req.user;
    // 1 hour from now
    const expiration = 60 * 60000;

    const token = jwt.sign({user:currUser}, process.env.JWT_SECRET)
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + expiration),
        secure: false,
        
        httpOnly: false
    })
    res.redirect('http://localhost:3000')
    //res.json({token})

})

//Route for authentication with google login, will add more login strategies in the future;

router.get('/google', passport.authenticate('google', {scope:['profile']}))


router.get('/google/callback', passport.authenticate('google', {session:false}), (req,res) => {
    //Generate JWT after successful callback
    //const token = jwt.sign({})
    let currUser = req.user;
    // 1 hour from now
    const expiration = 60 * 60000;

    const token = jwt.sign({user:currUser}, process.env.JWT_SECRET,{expiresIn: '7d'})
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + expiration),
        secure: false,
        
        httpOnly: false
    })
    res.redirect('http://localhost:3000')

})


module.exports = router