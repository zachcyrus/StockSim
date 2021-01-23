const express = require('express');
const router = express.Router();
const db = require('../db/index');
const register_controller = require('../controllers/registerController')

//Route to register users into SQL database
//INSERT INTO stock_users (Username, Password, ID)
//VALUES('req.username','req.password',req.id)

router.post('/', register_controller.registerUser);

module.exports = router