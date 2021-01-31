//This page is just an example for authentication

const passport = require('passport')
require('../config/passport')
const express = require('express');
const router = express.Router();


router.get('/test', passport.authenticate('jwt', {session:false}), (req,res)=> {
    res.send(`Congrats you are authenticated ${req.user.Username}`)
})

router.get('/user', passport.authenticate('jwt', {session:false}), (req,res)=> {
    res.json({
        user:req.user.Username
    })
})

module.exports = router