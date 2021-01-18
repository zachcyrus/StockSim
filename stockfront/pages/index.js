import Head from 'next/head';
import Layout from '../components/layout';
import StockChart from '../components/stockChart'
import Container from '@material-ui/core/Container';
import StockCard from '../components/stockCard'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>StockSim</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ color: 'white', textAlign: 'center', zIndex: 1, paddingTop:'29px' }} maxWidth='lg'>

        <div className="stockContainer">
          <h1>Portfolio Value</h1>


          <div className="topPerformers">

            <h3>Top Performers</h3>
            <StockCard />
          </div>

          <StockChart/>


          
        </div>

        <StockCard />
      </Container>
    </Layout>

  )
}
