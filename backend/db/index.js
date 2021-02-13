require('dotenv').config()

const Pool = require('pg').Pool


let pool;

if(process.env.NODE_ENV == 'production'){
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
      rejectUnauthorized: false
    }
  })

}

else{
  pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  })
}

module.exports = pool