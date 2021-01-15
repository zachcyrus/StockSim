import Head from 'next/head';
import Layout from '../components/layout';
import Container from '@material-ui/core/Container';
import PortfolioCard from '../components/portfolioCard';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Portfolios</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ color: 'white', textAlign:'center', zIndex:1 }} maxWidth='lg'>
        <h1>All Portfolios</h1>
        <PortfolioCard/>
        <PortfolioCard/>

      </Container>
    </Layout>

  )
}
