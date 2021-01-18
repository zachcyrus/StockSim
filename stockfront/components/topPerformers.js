import styles from '../styles/topPerformers.module.scss'


const TopPerformers = () => {
    return (
        <div className={styles.topPerformers}>
            <div className={styles.stockName}>
                <div className= {styles.stockImg} ></div>
                <div className={styles.stockGroup}>
                    <h3>AAPL</h3>
                    <h3>Apple Inc.</h3>
                </div>

            </div>

            <div className={styles.stockMoney}>
                <h3>$1000.76</h3>
                <h4>+14.87%</h4>
            </div>
        </div>
    )
}

export default TopPerformers;