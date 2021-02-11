require('dotenv').config()
const pool = require('../db/index')
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const LocalStrategy = require('passport-local').Strategy;


let findJwtFromCookie = (req) => {
  if (req && req.cookies) {
    let token = req.cookies['jwt']
    return token
  }
}

const jwtOptions = {
  //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), this was used for when we weren't using cookies
  jwtFromRequest: findJwtFromCookie,
  secretOrKey: process.env.JWT_SECRET
}

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

//FaceBook Strategy
passport.use(
  new Strategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
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
      let foundUser = await pool.query(findUserQuery, userToFindId)


      //if no one was found we have to register them to to fb table and user table
      if (foundUser.rows.length === 0) {

        const regUserQuery = `
          INSERT INTO stock_users("Username") VALUES($1) RETURNING "Username", "Id"
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
        return cb(null, newUser.rows[0])



      }
      //user is found
      else {
        console.log('User was found and is being returned')
        return cb(null, foundUser.rows[0])
      }

    }
  )
);

//Implementing JWT strategy
//Testing the use of cookies so we have to parse cookie to find jwt
passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  const findUserQuery = `
        SELECT "Username", "Id"
        FROM stock_users
        WHERE("Username" = $1)
      `
  const { user } = jwt_payload;
  const userToFind = [user.Username]

  let foundUser = await pool.query(findUserQuery, userToFind)

  //If user not found return false
  if (foundUser.rows.length === 0) {
    return done(null, false)
  }
  //else return user
  else {
    return done(null, foundUser.rows[0])
  }

}));

//Implementing Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      /* 
        First we retrieve  the user information from FB;
        Second if this user's FB isn't saved to our database, we save them to the database
        Third e just save the user

      */
      const findGoogleUserQuery = `
        SELECT "Username", "Id", google_id
        FROM stock_users
        INNER JOIN google_users
        ON stock_users."Id" = google_users.user_id
        WHERE(google_id = $1)
      `
      const userToFindId = [profile.id]
      let foundUser = await pool.query(findGoogleUserQuery, userToFindId)


      //if no one was found we have to register them to to google table and user table
      if (foundUser.rows.length === 0) {

        const regUserQuery = `
          INSERT INTO stock_users("Username") VALUES($1) RETURNING "Username", "Id"
        `
        const usernameValue = [profile.displayName]
        let newUser
        try {

          newUser = await pool.query(regUserQuery, usernameValue)

        } catch (err) {
          console.error(err)

        }

        //Now we have to insert the id from the newUser into the google_users database
        const insertGoogleUsersQuery = `
          INSERT INTO google_users(google_id, user_id) VALUES($1, $2) RETURNING *
        `

        const googleValues = [profile.id, newUser.rows[0].Id]

        try {
          const newGoogleUser = await pool.query(insertGoogleUsersQuery, googleValues)

        } catch (err) {
          console.error(err)
        }

        //If all goes well user has been successfully registered now to return the user
        return cb(null, newUser.rows[0])



      }
      //user is found
      else {
        console.log('Google User was found and is being returned')
        return cb(null, foundUser.rows[0])
      }

    }
  )
);
