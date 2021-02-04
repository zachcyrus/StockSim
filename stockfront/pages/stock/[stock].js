import Head from 'next/head';
import Layout from '../../components/layout';
import Container from '@material-ui/core/Container';
import StockCompany from '../../components/stockCompany';
import { useRouter } from 'next/router'
import axios from 'axios';
import { findCompany, formatData } from '../../util/helper'
const appleData = require('../../public/sampleAAPL52.json')



function Stocks({ username, companyInfo }) {
  const router = useRouter()
  const { stock } = router.query
  return (
    <Layout username={username}>
      <Head>
        <title>{stock.toUpperCase()} Stock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth='lg'>
        <StockCompany companyInfo={companyInfo} />
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
  const cookies = context.req.headers.cookie;

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

  let companyInfo = {
    'ticker': company.Symbol,
    'name': company['Company Name'],
    //we will find todays price from API
    'todaysPrice': finalData.today.value,
    //now to retrieve all price ranges
    'YearData': finalData
  }

  //If no user is found
  if (cookies == undefined) {
    return {
      props: {
        'username': null,
        companyInfo
      }
    }

  }

  //if a user is found based on cookies
  let userData = await axios.get('http://localhost:8000/protected/user', {
    headers: {
      Cookie: cookies
    }
  })
  let username = userData.data.user

  return {
    props: {
      username,
      companyInfo
    }
  }
}

export default Stocks;
