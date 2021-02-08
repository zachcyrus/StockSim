import Head from 'next/head';
import Layout from '../../components/layout';
import StockChart from '../../components/stockChart'
import Container from '@material-ui/core/Container';
import StockCard from '../../components/stockCard';
import StockCardData from '../../components/stockCardWData'
import TopPerformers from '../../components/topPerformers';
import PortfolioPieChart from '../../components/portfolioPieChart'
import { useRouter } from 'next/router'

import axios from 'axios';

//For the stock container, possible implementation of a horizontal scrolling option;
axios.defaults.withCredentials = true;

function UserPortfolio({ username, pieData }) {
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

                    <PortfolioPieChart pieData={pieData}/>

                </div>

                <div className="stockContainer">
                    {pieData.map(stock => <StockCardData stockInfo={stock} />)}

                </div>

            </Container>
        </Layout>

    )
}

export async function getServerSideProps(context) {
    const portfolioName = context.query.portfolio;
    const cookies = context.req.headers.cookie;
    if (!cookies) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }

    }

    let userData = await axios.get('http://localhost:8000/protected/user', {
        headers: {
            Cookie: cookies
        }
    })


    let username = userData.data.user

    //find weighted avg of each stock
    let pieData = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/portfolios/${portfolioName}/piechart`, {
        headers: {
            Cookie: cookies
        }
    })


    pieData = pieData.data;
    return {
        props: {
            username,
            pieData
        }, // will be passed to the page component as props
    }
}

export default UserPortfolio
