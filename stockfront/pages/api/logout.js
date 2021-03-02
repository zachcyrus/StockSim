import axios from 'axios';
import Cookies from 'cookies';


export default async (req, res) => {
  let cookies = new Cookies(req,res);
  try {
    // If in production mode cookie and jwt expires in 7 days, else one hour
    cookies.set('jwt')
    return res.redirect(`/`)

  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}