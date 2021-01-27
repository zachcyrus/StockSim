require('dotenv').config()
const express = require('express')
const passport = require('passport')
const app = express();
const port = 8000;
const pool = require('./db/index');
//Routers
const authRouter = require('./routes/auth')
const protectedRouter = require('./routes/protected')
const portfolioRouter = require('./routes/portfolios')
const stockRouter = require('./routes/stocks')

var cors = require('cors')

app.use(passport.initialize())

app.use(express.json()); 
app.use(cors())


//Routes 

app.use('/auth', authRouter)
app.use('/protected', protectedRouter)
app.use('/portfolio', portfolioRouter)
//Need to include route to add stocks to a selected portfolio
app.use('/stocks', stockRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});