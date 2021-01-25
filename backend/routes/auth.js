const passport = require('passport')
require('../config/passport')
const express = require('express');
const router = express.Router();


router.get('/facebook', passport.authenticate('facebook'))


//Most likely sign a jwt token on callback
router.get("/facebook/callback", passport.authenticate("facebook", {
    failureRedirect: "/fail"
}))

module.exports = router