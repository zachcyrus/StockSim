import Head from 'next/head';
import Layout from '../components/layout';
import StockChart from '../components/stockChart'
import Container from '@material-ui/core/Container';
import StockCard from '../components/stockCard';
import TopPerformers from '../components/topPerformers'

//For the stock container, possible implementation of a horizontal scrolling option;

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>StockSim</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ color: 'white', textAlign: 'center', zIndex: 1, paddingTop:'29px' }} maxWidth='lg'>

        <div className="portfolioContainer">
          <h1>Portfolio Value</h1>


          <div className="topPerformers">

            <h3>Top Performers</h3>
            <TopPerformers/>
          </div>

          <StockChart/>
          
        </div>

        <div className="stockContainer">
          <StockCard />
          <StockCard />
        </div>

        
      </Container>
    </Layout>

  )
}
