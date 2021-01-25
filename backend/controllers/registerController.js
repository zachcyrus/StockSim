const pool = require('../db/index')
//INSERT INTO stock_users (Username, Password, ID)
//VALUES('req.username','req.password',req.id)


exports.registerUser = async (req, res) => {
    const registerQuery = `INSERT INTO stock_users("Username", "Password") VALUES($1, $2) RETURNING *`
    const registerValues = [req.body.username, req.body.password]

    const findUserQuery = `SELECT Count("Username") FROM stock_users WHERE "Username" = $1`
    const findValue = [req.body.username]
    try {
      const foundUser = await pool.query(findUserQuery,findValue)
      const {count} = foundUser.rows[0]
      console.log(foundUser.rows[0])
      if(foundUser.rows[0].count > 0){
        console.log(foundUser.rows[0])
        res.json({
          'message': `Username already exists`
        })
      }
      else{
        const newUser = await pool.query(registerQuery,registerValues)
        console.log(newUser.rows[0])
        res.json(newUser.rows[0])
        
      }
      
      
    } catch (err) {
      console.log(err.message)
    }
}

