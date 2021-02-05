import styles from '../styles/stockCard.module.scss'
let tickerData = require('../assets/allTickers/nasdaq-listed-symbols_json.json')

let abbreviateName = (name) => {
    let abbrev = name.substring(0, 11)
    return abbrev.concat('...')
}

const StockCardData = ({ stockInfo }) => {
    console.log(stockInfo)
    let companyName
    //This if function is mainly here for testing with company names that aren't real which exist
    //in the sql table
    
    if (tickerData.find(x => x.Symbol === stockInfo.stock_name)) {
        
        companyName = tickerData.find((company) => {
            if (company.Symbol === `${stockInfo.stock_name.toUpperCase()}`) {
                return true
            }
        })

        companyName = companyName['Company Name'].length >= 14 ? abbreviateName(companyName['Company Name']) : companyName['Company Name']


    }

    else{
        companyName = 'No name'
    }


    return (
        <div className={styles.stockCard}>


            <div className={styles.stockName}>
                <div className={styles.stockImg}></div>
                <div className={styles.stockGroup}>
                    <h3>{stockInfo.stock_name}</h3>
                    <h3>{companyName}</h3>
                </div>

            </div>


            <div className={styles.stockMoney}>
                <h3>${parseFloat((stockInfo.weightedavg * stockInfo.totalamount).toFixed(2))}</h3>
                <h4>+14.87%</h4>
            </div>


            <div className={styles.purchaseInfo}>
                <a>Initial Purchase: {new Date(stockInfo.firstpurchase).toLocaleString()}</a> <br />
                <div className={styles.shareAmount}>Amount of shares: {stockInfo.totalamount}</div>
            </div>

        </div>
    )
}

export default StockCardData;
