import Layout from '../components/layout'
import FBLogin from '../components/fbLogin'
import { Container } from '@material-ui/core'

export default function login() {
    return (
        <Layout>
            <Container style={{textAlign:'center'}} maxWidth={'lg'}>
                <FBLogin />
            </Container>

        </Layout>

    )
}
