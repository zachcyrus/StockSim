import Layout from '../components/layout'
import FBLogin from '../components/fbLogin'
import Container from '@material-ui/core/Container';

export default function login() {
    return (
        <Layout>
            <Container style={{ textAlign: 'center' }} maxWidth={'lg'}>
                <div style={{ color: 'white' }}>

                    <a href="http://localhost:8000/auth/facebook">
                        <h1>LOGIN IN TO FACEBOOK</h1>
                    </a>
                </div>
    )
            </Container>

        </Layout>

    )
}
