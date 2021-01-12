import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NavBar from '../components/navbar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>StockSim</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar/>
    </div>


  )
}
