import Head from 'next/head';
import Layout from '../components/layout';
import Container from '@material-ui/core/Container';
import Cookies from 'cookies'

function Auth({ username, }) {

    return (
        <Layout username={username}>
            <Head>
                <title>Success</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container style={{ color: 'white', textAlign: 'center', zIndex: 1, paddingTop: '29px' }} maxWidth='lg'>


            </Container>
        </Layout>

    )
}


export async function getServerSideProps(context) {
    //Add a util function to check for authentication, to keep everything concise
    const expiration = process.env.NODE_ENV === 'production' ? 1440 * 60000 : 60 * 60000;

    let jwt = context.query.jwt;
    if (jwt !== '') {
        const cookies = new Cookies(context.req, context.res)
        cookies.set('jwt', jwt, {
            expires: new Date(Date.now() + expiration),
            httpOnly: true
        })

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }

    }
    else{
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }

    }


    
}

export default Auth