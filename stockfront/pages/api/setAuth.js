import axios from 'axios';
import cookie from 'cookie';


export default async (req, res) => {
  let apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : process.env.NEXT_PUBLIC_APIURL
  try {
    // If in production mode cookie and jwt expires in 7 days, else one hour
    const expiration = process.env.NODE_ENV === 'production' ? 1440 * 60000 : 60 * 60000;
    /* cookies.set('jwt', jwtToken, {
      expires: new Date(Date.now() + expiration),
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true
    }) */
    let tokenVal = req.query.jwt
    /* let cookieObj = {
      expires: new Date(Date.now() + expiration),
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      httpOnly: true,
      
    }
    cookies.set('jwt', tokenVal, cookieObj )

    return res.redirect('/') */

    res.setHeader("Set-Cookie", cookie.serialize('jwt', tokenVal, {
      expires: new Date(Date.now() + expiration),
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      httpOnly: true,
    }))
    return res.redirect('/')

  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}