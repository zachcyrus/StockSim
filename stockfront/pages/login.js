import Layout from '../components/layout'
import Container from '@material-ui/core/Container';
import styles from '../styles/login.modal.module.scss'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import Link from 'next/link';
import Image from 'next/image'

export default function login() {
    return (
        <Layout>
            <Container style={{ textAlign: 'center' }} maxWidth={'lg'}>
                <div className={styles.loginForm}>
                    <div className={styles.drawing}>
                        <Image width="400" height="400" src='/stockLoginDrawing.svg' />
                    </div>

                    <div className={styles.loginChoices}>
                        <h1>Login Here</h1>

                        <div className={styles.loginOptions}>
                            <Link href='http://localhost:8000/auth/facebook'>
                                <FacebookLoginButton />
                            </Link>

                            <Link href='#'>
                                <GoogleLoginButton />
                            </Link>

                        </div>

                    </div>

                </div>

    )
            </Container>

        </Layout>

    )
}