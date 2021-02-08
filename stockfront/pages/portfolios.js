import Head from 'next/head';
import Layout from '../components/layout';
import Container from '@material-ui/core/Container';
import PortfolioCard from '../components/portfolioCard';
import Modal from '../components/modal'
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Router from "next/router"
//Need a delete button for portfolios
//need an alert component for errors
//Add keys to portfolio cards




function Portfolios({ username, allPortfolios }) {
  const [open, setOpen] = useState(false)
  const [portfolioName, setPortfolioName] = useState('')

  const onClose = () => {
    if (open) {
      setPortfolioName('')
      setOpen(false)
    }
    else {
      setOpen(true)
    }
  }

  const handleChange = (e) => {
    setPortfolioName(e.target.value)
  }

  const submitPortfolio = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(`${process.env.NEXT_PUBLIC_APIURL}/portfolios/add`, { portfolioName }, { withCredentials: true })
      console.log(response.data)
      Router.reload();

    } catch (error) {
      console.log(error);

    }

    setOpen(false)
  }

  return (
    <Layout username={username}>
      <Head>
        <title>Portfolios</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ color: 'white', zIndex: 1 }} maxWidth='lg'>
        <div className="portfolioHeader">
          <h1>All Portfolios:  </h1>
          <button onClick={onClose} className="addPortfolio">Create Portfolio</button>
        </div>




        {username ? (
          <div>
            {allPortfolios.map((row, index) => {
              return (
                <PortfolioCard key={index} data={row} />
              )
            })}
          </div>

        ) :
          <h1 id='loginLink'><Link href='/login'>Click here to sign in and to create a portfolio</Link></h1>
        }

        <p>If you don't see a portfolio you created please search for and buy a stock and choose your newly created portfolio. It
        will then appear on this page.
        </p>



        <Modal show={open} onClose={onClose}>
          <form className="portfolioForm">
            <label htmlFor="portfolioName">Enter name for new Portfolio: <input type="text" onChange={handleChange} name="portfolioName"></input> </label>
            <button onClick={submitPortfolio} type="submit">Submit Portfolio</button>
          </form>
        </Modal>


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

  //retrieve list of portfolios and their values
  let portfolioData = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/portfolios/allportfoliovalues`, {
    headers: {
      Cookie: cookies
    }
  })


  let username = userData.data.user
  let allPortfolios = portfolioData.data;
  return {
    props: {
      username,
      allPortfolios
    }, // will be passed to the page component as props
  }
}

export default Portfolios