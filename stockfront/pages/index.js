import Head from 'next/head';
import Layout from '../components/layout';
import StockChart from '../components/stockChart'
import Container from '@material-ui/core/Container';
import StockCard from '../components/stockCard';
import TopPerformers from '../components/topPerformers';
import PortfolioPieChart from '../components/portfolioPieChart'
import axios from 'axios';
import LoginCard from '../components/loginComponent';
import PortfolioSummary from '../components/portfolioSummaries'

//For the stock container, possible implementation of a horizontal scrolling option;
axios.defaults.withCredentials = true;


function Home({ username, portfolioSummaryData }) {

  return (
    <Layout username={username}>
      <Head>
        <title>StockSim</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container style={{ color: 'white', textAlign: 'center', zIndex: 1, paddingTop: '29px' }} maxWidth='lg'>
        {username == null ? <LoginCard /> :
          <div>
            <h1>Feel free to browse stocks using the searchbar above</h1>
            <h2>Create portfolios by pressing the briefcase in the header</h2>
            <h2>Sign out by pressing the person icon and clicking log out</h2>
            <h2>The home button will take you back to this page</h2>
            {portfolioSummaryData == '' ? '' : <PortfolioSummary allPortfoliosData={portfolioSummaryData}/>}
          </div>
          
        }

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
  let userData = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/protected/user`, {
    headers: {
      Cookie: cookies
    }
  })

  if (userData.status !== 200) {
    return {
      props: {
        'username': null
      }
    }
  }

  let portfolioSummaryData = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/portfolios/allportfoliovalues`, {
    headers: {
      Cookie: cookies
    }
  })


  let username = userData.data.user
  portfolioSummaryData = portfolioSummaryData.data;
  return {
    props: {
      username,
      portfolioSummaryData
    }, // will be passed to the page component as props
  }
}

export default Home
