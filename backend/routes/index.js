const express = require('express');
const router = express.Router(); 

router.get('/test', (req,res)=> {
    res.json({
        message: 'Test should work'
    })
})

module.exports = router