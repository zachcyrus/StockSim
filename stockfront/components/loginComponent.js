import styles from '../styles/login.module.scss'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import Link from 'next/link';
import { useRouter } from 'next/router'

import Image from 'next/image'

const LoginCard = () => {
    const router = useRouter()
    return (
        <div className={styles.loginForm}>
            <div className={styles.drawing}>
                <Image width="400" height="400" src='/stockLoginDrawing.svg' />
            </div>

            <div className={styles.loginChoices}>
                <h1>Login Here</h1>

                <div className={styles.loginOptions}>
                    <FacebookLoginButton onClick={() => router.push('http://localhost:8000/auth/facebook')}/>
                    
                    <GoogleLoginButton onClick={() => router.push('http://localhost:8000/auth/google')}/>
                </div>

            </div>

        </div>

    )
}

export default LoginCard;