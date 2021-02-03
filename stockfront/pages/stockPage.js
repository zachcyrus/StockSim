import Head from 'next/head';
import Layout from '../components/layout';
import Container from '@material-ui/core/Container';
import StockCompany from '../components/stockCompany'
import StockChart_Data from '../components/stockChart&Data'
import StockChart from '../components/stockChart'
export default function Stocks() {
  
  return (
    <Layout>
      <Head>
        <title>AAPL Stock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ color: 'black'}} maxWidth='lg'>
        <StockChart_Data/>
      </Container>
    </Layout>

  )
}
