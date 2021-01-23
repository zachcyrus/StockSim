const pool = require('../db/index')
//INSERT INTO stock_users (Username, Password, ID)
//VALUES('req.username','req.password',req.id)


exports.registerUser = async (req, res) => {
    const registerQuery = `INSERT INTO stock_users("Username", "Password") VALUES($1, $2) RETURNING *`
    const values = [req.body.username, req.body.password]
    try {
      const newUser = await pool.query(registerQuery,values)
      console.log(newUser.rows[0])
      res.json(newUser.rows[0])
      
    } catch (err) {
      console.log(err.message)
    }
}

