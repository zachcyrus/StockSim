import axios from 'axios';
import Cookies from 'cookies'

export default async (req, res) => {
  let apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : process.env.NEXT_PUBLIC_APIURL
  let cookies = new Cookies(req, res)
  try {
    // If in production mode cookie and jwt expires in 7 days, else one hour
    const expiration = process.env.NODE_ENV === 'production' ? 1440 * 60000 : 60 * 60000;

    let tokenVal = req.query.jwt
     let cookieObj = {
      expires: new Date(Date.now() + expiration),
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true
    }
    //cookies.set('jwt', tokenVal, cookieObj )

    return res.redirect(`/auth/?jwt=${tokenVal}`)

  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}