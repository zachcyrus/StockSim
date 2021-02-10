import styles from '../styles/stockCard.module.scss'
let tickerData = require('../assets/allTickers/allTickers.json')

let abbreviateName = (name) => {
    let abbrev = name.substring(0, 11)
    return abbrev.concat('...')
}

const StockCardData = ({ stockInfo }) => {
    let companyName
    //This if function is mainly here for testing with company names that aren't real which exist
    //in the sql table
    
    if (tickerData.find(x => x.ticker === stockInfo.stock_name)) {
        
        companyName = tickerData.find((company) => {
            if (company.ticker === `${stockInfo.stock_name.toUpperCase()}`) {
                return true
            }
        })

        companyName = companyName.name.length >= 14 ? abbreviateName(companyName.name) : companyName.name


    }

    else{
        companyName = 'No name'
    }

    let sign = () => {
        if(Math.sign(stockInfo.percentIncOrDec) == -1){
            return false
        }
        else {
            return true;
        }
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
                <h3> ${stockInfo.latestValue} </h3>
                <h4 style={{color: sign() ? 'green' : 'red'}}>{ sign() ? '+' : '' }{stockInfo.percentIncOrDec.toFixed(2)}%</h4>
            </div>


            <div className={styles.purchaseInfo}>
                <a>Initial Purchase: {new Date(stockInfo.firstpurchase).toLocaleString()}</a> <br />
                <a className={styles.cost}>Weighted Cost: ${stockInfo.weightedCost.toFixed(2)}</a>
                <div className={styles.shareAmount}>Total shares: {stockInfo.totalquantity}</div>
            </div>

        </div>
    )
}

export default StockCardData;
