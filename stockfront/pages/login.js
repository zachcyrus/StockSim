import Layout from '../components/layout'
import Container from '@material-ui/core/Container';
import LoginCard from '../components/loginComponent'

export default function login() {
    return (
        <Layout>
            <Container style={{ textAlign: 'center' }} maxWidth={'lg'}>
                <LoginCard/>
            </Container>

        </Layout>

    )
}