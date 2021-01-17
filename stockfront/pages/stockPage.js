import Head from 'next/head';
import Layout from '../components/layout';
import Container from '@material-ui/core/Container';
import StockCompany from '../components/stockCompany'

export default function Stocks() {
  return (
    <Layout>
      <Head>
        <title>AAPL Stock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ color: 'white' }} maxWidth='lg'>
        <StockCompany/>
      </Container>
    </Layout>

  )
}
