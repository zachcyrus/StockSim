import Head from 'next/head';
import Layout from '../../components/layout';
import Container from '@material-ui/core/Container';
import StockCompany from '../../components/stockCompany';
import { useRouter } from 'next/router'
import axios from 'axios';
import { findCompany, formatData } from '../../util/helper'
const appleData = require('../../public/sampleAAPL52.json')
import Cookies from 'cookies'



function Stocks({ username, companyInfo, allPortfolios, userStockStats, token }) {
  const router = useRouter()

  const { stock } = router.query

  let apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : process.env.NEXT_PUBLIC_APIURL

  return (
    <Layout username={username}>
      <Head>
        <title>{stock.toUpperCase()} Stock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth='lg'>
        <StockCompany apiUrl={apiUrl} token={token} allPortfolios={allPortfolios} statData={userStockStats} companyInfo={companyInfo} />
      </Container>
    </Layout>

  )
}

//need to retrieve to data to fill the stockCompany component 
/*
1. Need Company Name 
2. Need current value
3. Need current percent change
4. Retrieve full year data

Your Stats Component
1. Date of last purchase
2. Peak Value

*/

export async function getServerSideProps(context) {
  let apiUrl = process.env.NODE_ENV === 'development' ? process.env.LOCAL_APIURL : process.env.NEXT_PUBLIC_APIURL
  let cookies = new Cookies(context.req, context.res)
  let token = cookies.get('jwt')

  let stockToFindSymbol = context.query.stock.toUpperCase();

  let stockData;

  //if in development node don't use api to fetch data,
  //we will instead use data we have already saved
  if (process.env.NODE_ENV === 'development') {
    stockData = appleData
  }
  else {
    let findStockData = await axios.get('https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data', {
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.RAPIDAPI_HOST
      },
      params: {
        symbol: stockToFindSymbol,
      }
    })
    stockData = findStockData.data;
  }

  let queryStockPrices = stockData.prices
  



  let company = findCompany(stockToFindSymbol)
  let finalData = formatData(queryStockPrices)
  let percentChange = ((finalData.lastDay[1].value - finalData.lastDay[0].value)/finalData.lastDay[0].value)*100
  let valueChange = (finalData.lastDay[1].value - finalData.lastDay[0].value)

  percentChange=percentChange.toFixed(2);
  valueChange = valueChange.toFixed(2);
  
  let companyInfo = {
    'ticker': company.ticker,
    'name': company.name,
    'last2Days': finalData.lastDay,
    //we will find todays price from API
    'todaysPrice': finalData.today.value,
    percentChange,
    valueChange,
    //now to retrieve all price ranges
    'YearData': finalData
  }


  //If no user is found
  if (token == undefined) {
    return {
      props: {
        'username': null,
        companyInfo
      }
    }

  }

  //if a user is found based on cookies
  let userData = await axios.get(`${apiUrl}/protected/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  let username = userData.data.user

  //get portfolio list
  let portfolioData = await axios.get(`${apiUrl}/portfolios`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  let allPortfolios = portfolioData.data;

  //get most recent date purchased


  let getPurchaseDate = await axios({
    method: 'get',
    url: `${apiUrl}/stocks/purchasedate/${stockToFindSymbol}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })


  let purchaseDate = getPurchaseDate.data;
  if (purchaseDate) {
    companyInfo.purchaseDate = new Date(purchaseDate).toLocaleString()
  }

  //Now to retrieve the user stats for stocks

  let getUserStockData = await axios({
    method: 'get',
    url: `${apiUrl}/portfolios/allportfolios/${stockToFindSymbol}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })


  let userStockStats = getUserStockData.data;

  return {
    props: {
      username,
      companyInfo,
      allPortfolios,
      userStockStats,
      token
    }
  }
}

export default Stocks;
