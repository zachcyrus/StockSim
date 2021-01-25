require('dotenv').config()
const express = require('express')
const passport = require('passport')
const app = express();
const port = 8000;
const pool = require('./db/index');
var registerRouter = require('./routes/register')
var authRouter = require('./routes/auth')
var cors = require('cors')

app.use(passport.initialize())

app.use(express.json()); 
app.use(cors())


//Routes 

app.use('/register', registerRouter)
app.use('/auth', authRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});