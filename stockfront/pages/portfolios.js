import Head from 'next/head';
import Layout from '../components/layout';
import Container from '@material-ui/core/Container';
import PortfolioCard from '../components/portfolioCard';
import Modal from '../components/modal'
import { useState } from 'react';


export default function Portfolios() {
  const [open, setOpen] = useState(false)

  const onClose = () => {
    console.log('Clicked')
    if(open){
      setOpen(false)
    }
    else{
      setOpen(true)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Portfolios</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ color: 'white', zIndex:1 }} maxWidth='lg'>
        <div className="portfolioHeader">
          <h1>All Portfolios:  </h1>
          <button onClick={onClose} className="addPortfolio">Create Portfolio</button>
        </div>
        
        <PortfolioCard/>
        <PortfolioCard/>

        <Modal show={open} onClose={onClose}>
            <form className="portfolioForm">
              <label for="portfolioName">Enter name for new Portfolio: <input type="text" name="portfolioName"></input> </label>
              <button type="submit">Submit Portfolio</button>
            </form>
        </Modal>
        

      </Container>
    </Layout>

  )
}
