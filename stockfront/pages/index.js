import Head from 'next/head';
import Layout from '../components/layout';
import StockChart from '../components/stockChart'
import Container from '@material-ui/core/Container';
import StockCard from '../components/stockCard';
import TopPerformers from '../components/topPerformers';
import axios from 'axios';

//testing autocomplete
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';


const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 }
]



//For the stock container, possible implementation of a horizontal scrolling option;
axios.defaults.withCredentials = true;


function Home({ username }) {

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

          <StockChart />

        </div>

        <div className="stockContainer">
          <StockCard />
          <StockCard />
          <Autocomplete 
                    style={{width: '100%'}}
                    freeSolo
                    options={top100Films.map((option) => option.title)}
                    renderInput={(params) => (

                        <TextField
                            {...params}
                            color='secondary'
                            fullWidth label='Type below to browse stocks'
                            InputProps={{
                                ...params.InputProps,
                                type:'search',
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon style={{ color: 'white' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                    )}
                />
        </div>

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
  let username = userData.data.user
  return {
    props: {
      username
    }, // will be passed to the page component as props
  }
}

export default Home
