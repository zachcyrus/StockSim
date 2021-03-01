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
import Cookies from 'cookies'




function Portfolios({ username, allPortfolios, token }) {
  let apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : process.env.NEXT_PUBLIC_APIURL
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
      let response = await axios.post(`${apiUrl}/portfolios/add`, { portfolioName }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert(`${portfolioName} was created!`)
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

        {
          username ?
            allPortfolios == '' ? 'You currently have no portfolios, create one today!'
              : (
                <div>
                  {allPortfolios.map((row, index) => {
                    return (
                      <PortfolioCard key={index} data={row} />
                    )
                  })}
                </div>
              )
            : <h1 id='loginLink'><Link href='/login'>Click here to sign in and to create a portfolio</Link></h1>
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

export async function getServerSideProps({ req, res }) {
  //Add a util function to check for authentication, to keep everything concise
  let apiUrl = process.env.NODE_ENV === 'development' ? process.env.LOCAL_APIURL : process.env.NEXT_PUBLIC_APIURL
  let cookies = new Cookies(req, res)
  let token = cookies.get('jwt')
  if (token == undefined) {
    return {
      props: {
        'username': null
      }
    }

  }


  let userData = await axios.get(`${apiUrl}/protected/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (userData.status !== 200) {
    return {
      props: {
        'username': null
      }
    }
  }

  //retrieve list of portfolios and their values
  let portfolioData = await axios.get(`${apiUrl}/portfolios/allportfoliovalues`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })


  let username = userData.data.user
  let allPortfolios = portfolioData.data;
  return {
    props: {
      username,
      allPortfolios,
      token
    }, // will be passed to the page component as props
  }
}

export default Portfolios