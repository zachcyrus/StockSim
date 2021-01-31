import Head from 'next/head';
import Layout from '../components/layout';
import StockChart from '../components/stockChart'
import Container from '@material-ui/core/Container';
import StockCard from '../components/stockCard';
import TopPerformers from '../components/topPerformers';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



//For the stock container, possible implementation of a horizontal scrolling option;
axios.defaults.withCredentials = true;


function Home({username}) {
  console.log(username)
  

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

          <StockChart />

        </div>

        <div className="stockContainer">
          <StockCard />
          <StockCard />
          <h1 style={{color:'white'}}>
          </h1>
        </div>




      </Container>
    </Layout>

  )
}

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie;
  if(cookies == undefined){
    return{
      props: {
        'username': null
      }
    }

  }
  console.log(cookies)
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
