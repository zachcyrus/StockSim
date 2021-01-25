require('dotenv').config()
const pool = require('../db/index')
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;



passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});


passport.use(
  new Strategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile)
      /* 
        First we retrieve  the user information from FB;
        Second if this user's FB isn't saved to our database, we save them to the database
        Third e just save the user

      */
      const findUserQuery = `
        SELECT "Username", "Id", "fbId"
        FROM stock_users
        INNER JOIN fb_users
        ON stock_users."Id" = fb_users.user_id
        WHERE("fbId" = $1)
      `
      const userToFindId = [profile.id]
      let foundUser = await pool.query(findUserQuery,userToFindId)


      //if no one was found we have to register them to to fb table and user table
      if (foundUser.rows.length === 0) {

        const regUserQuery = `
          INSERT INTO stock_users("Username") VALUES($1) RETURNING "Id"
        `
        const usernameValue = [profile.displayName]
        let newUser
        try {

          newUser = await pool.query(regUserQuery, usernameValue)
          console.log('Registering new user into db')
          console.log(newUser.rows[0])

        } catch (err) {
          console.error(err)

        }

        //Now we have to insert the id from the newUser into the fb_user database
        const insertFbUsers = `
          INSERT INTO fb_users("fbId", user_id) VALUES($1, $2) RETURNING *
        `

        const fbValues = [profile.id, newUser.rows[0].Id]

        try {
          const newFbUser = await pool.query(insertFbUsers, fbValues)
          console.log('Register user into fb db')
          console.log(newFbUser.rows[0])

        } catch (err) {
          console.error(err)
        }
        
        //If all goes well user has been successfully registered now to return the user
        cb(null, newUser.rows[0])


        
      }
      //user is found
      else{
        console.log('User was found and is being returned')
        return cb(null, foundUser.rows[0])
      }

    }
  )
);

