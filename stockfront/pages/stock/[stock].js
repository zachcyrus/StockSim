import Head from 'next/head';
import Layout from '../../components/layout';
import Container from '@material-ui/core/Container';
import StockCompany from '../../components/stockCompany';
import { useRouter } from 'next/router'
import axios from 'axios';

let companyInfo = {
  'ticker': 'AAPL',
  'name': 'Apple Inc',
  'todaysPrice': 158.87
}

function Stocks({username}) {
    const router = useRouter()
    const {stock} = router.query

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
    //Add a util function to check for authentication, to keep everything concise

    //now we have to retrieve data from api to fill stockPage

    /*
    let stockData = await axios.get('https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data',{
        headers:{
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.RAPIDAPI_HOST
        }
    })

    */
   

    const cookies = context.req.headers.cookie;
    if(cookies == undefined){
      return{
        props: {
          'username': null
        }
      }
  
    }
    let userData = await axios.get('http://localhost:8000/protected/user', {
      headers: {
        Cookie: cookies
      }
    })
    let username = userData.data.user

    return {
      props: {
        username
      }
    }
  } 

export default Stocks;
  