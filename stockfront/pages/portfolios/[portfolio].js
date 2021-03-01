import Head from 'next/head';
import Layout from '../../components/layout';
import StockChart from '../../components/stockChart'
import Container from '@material-ui/core/Container';
import StockCard from '../../components/stockCard';
import StockCardData from '../../components/stockCardWData'
import TopPerformers from '../../components/topPerformers';
import PortfolioPieChart from '../../components/portfolioPieChart'
import { useRouter } from 'next/router'
import Cookies from 'cookies'


import axios from 'axios';

//For the stock container, possible implementation of a horizontal scrolling option;
axios.defaults.withCredentials = true;

function UserPortfolio({ username, pieData }) {
    let sortedData = pieData.sort((a, b) => b.percentIncOrDec - a.percentIncOrDec)
    sortedData = sortedData.slice(0, 3)

    let portfolioValue = pieData.reduce((acc, curr) => {
        acc = parseFloat(curr.latestValue) + acc;
        return acc;

    }, 0)
    return (


        <Layout username={username}>
            <Head>
                <title>StockSim</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container style={{ color: 'white', textAlign: 'center', zIndex: 1, paddingTop: '29px' }} maxWidth='lg'>

                <div className="portfolioContainer">
                    <h1>{pieData[0].portfolio_name} ${Math.round(portfolioValue * 100) / 100}</h1>

                    <div className='topPerformers'>
                        <h1>Top Performers</h1>
                        <TopPerformers data={pieData} />
                    </div>



                    <PortfolioPieChart pieData={pieData} />

                </div>

                <div className="stockContainer">
                    {pieData.map(stock => <StockCardData key={stock.stock_name} stockInfo={stock} />)}

                </div>

            </Container>
        </Layout>

    )
}

export async function getServerSideProps(context) {
    const portfolioName = context.query.portfolio;
    let apiUrl = process.env.NODE_ENV === 'development' ? process.env.LOCAL_APIURL : process.env.NEXT_PUBLIC_APIURL

    let cookies = new Cookies(context.req, context.res)
    let token = cookies.get('jwt')
    if (!cookies) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }

    }

    let userData = await axios.get(`${apiUrl}/protected/user`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })


    let username = userData.data.user

    //find weighted avg of each stock
    let pieData = await axios.get(`${apiUrl}/portfolios/${portfolioName}/piechart`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (pieData.data.error) {
        return {
            redirect: {
                destination: '/portfolios',
                permanent: false,
            },
        }
    }


    pieData = pieData.data;
    return {
        props: {
            username,
            pieData
        }, // will be passed to the page component as props
    }
}

export default UserPortfolio
