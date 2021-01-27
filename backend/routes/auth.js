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

    const token = jwt.sign({user:currUser}, process.env.JWT_SECRET)
    return res.json({token})

})

module.exports = router