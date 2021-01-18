import styles from '../styles/stockCard.module.scss'

const StockCard = () => {
    return (
        <div className={styles.stockCard}>


            <div className={styles.stockName}>
                <div className={styles.stockImg}></div>
                <div className={styles.stockGroup}>
                    <h3>AAPL</h3>
                    <h3>Apple Inc.</h3>
                </div>

            </div>

            <div className={styles.stockMoney}>
                <h3>$1000.76</h3>
                <h4>+14.87%</h4>
            </div>

            <div className={styles.purchaseInfo}>
                <a>Bought on: 01-22-2010</a> <br/>
                <a>For $300 x 3 = $900</a>
            </div>

        </div>
    )
}

export default StockCard;