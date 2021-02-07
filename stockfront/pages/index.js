import Head from 'next/head';
import Layout from '../components/layout';
import StockChart from '../components/stockChart'
import Container from '@material-ui/core/Container';
import StockCard from '../components/stockCard';
import TopPerformers from '../components/topPerformers';
import PortfolioPieChart from '../components/portfolioPieChart'
import axios from 'axios';

//For the stock container, possible implementation of a horizontal scrolling option;
axios.defaults.withCredentials = true;

let exampleData = [
  {
      "portfolio_name": "Second Port",
      "weightedavg": "109.870",
      "stock_name": "AAPL",
      "quantity": "10"
  },
  {
      "portfolio_name": "Second Port",
      "weightedavg": "40.200",
      "stock_name": "DOGE\n",
      "quantity": "3"
  }
]



function Home({ username }) {

  return (
    <Layout username={username}>
      <Head>
        <title>StockSim</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ color: 'white', textAlign: 'center', zIndex: 1, paddingTop: '29px' }} maxWidth='lg'>

        <div className="portfolioContainer">
          <h1>Portfolio Value</h1>


          <div className="topPerformers">

            <h3>Top Performers</h3>
            <TopPerformers />
          </div>

          <PortfolioPieChart pieData={exampleData}/>

        </div>

        <div className="stockContainer">
          <StockCard />
          <StockCard />
          
        </div>

      </Container>
    </Layout>

  )
}

export async function getServerSideProps(context) {
  //Add a util function to check for authentication, to keep everything concise
  const cookies = context.req.headers.cookie;
  if (cookies == undefined) {
    return {
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
    }, // will be passed to the page component as props
  }
}

export default Home
