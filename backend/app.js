require('dotenv').config()
const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const helmet = require("helmet");
const cors = require('cors')
const app = express();
const port = process.env.PORT || 8000;
const pool = require('./db/index');
//Routers
const authRouter = require('./routes/auth')
const protectedRouter = require('./routes/protected')
const portfolioRouter = require('./routes/portfolios')
const stockRouter = require('./routes/stocks')

const corsConfig ={
  origin: true,
  credentials: true
}

app.use(helmet());
app.use(bodyParser.json()); 
app.use(cookieParser())
app.use(express.json()); 
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))
app.use(passport.initialize())



//Routes 

app.use('/auth', authRouter)
app.use('/protected', protectedRouter)
app.use('/portfolios', portfolioRouter)
//Need to include route to add stocks to a selected portfolio
app.use('/stocks', stockRouter)

app.listen(port, () => {
  console.log(`StockSIM DB app listening on port ${port}!`)

});