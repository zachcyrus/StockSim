require('dotenv').config()
const express = require('express')
const app = express();
const port = 8000;
const pool = require('./db/index');
var registerRouter = require('./routes/register')
var cors = require('cors')



app.use(express.json()); 
app.use(cors())


//Routes 
app.get('/', (req, res) => {
  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })
});


app.use('/register', registerRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});