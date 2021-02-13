import styles from '../styles/login.module.scss'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios'
axios.defaults.withCredentials;
import Image from 'next/image'

const LoginCard = () => {
    const router = useRouter()
    const guestLogin = async() => {
        let guestLoggedIn = await axios
            .get(`${process.env.NEXT_PUBLIC_APIURL}/auth/guest`,
            { withCredentials: true })
        if(guestLoggedIn.data.message){
            router.push('/')
        }

        
    }
    return (
        <div className={styles.loginForm}>
            <div className={styles.drawing}>
                <Image width="400" height="400" src='/stockLoginDrawing.svg' />
            </div>

            <div className={styles.loginChoices}>
                <h1>Login Here</h1>

                <div className={styles.loginOptions}>
                    <FacebookLoginButton onClick={() => router.push(`${process.env.NEXT_PUBLIC_APIURL}/auth/facebook`)} />

                    <GoogleLoginButton onClick={() => router.push(`${process.env.NEXT_PUBLIC_APIURL}/auth/google`)} />

                    <button onClick={guestLogin} className={styles.guestLogin}>
                        <h2>Login as guest here</h2>
                    </button>
                </div>

            </div>

        </div>

    )
}

export default LoginCard;