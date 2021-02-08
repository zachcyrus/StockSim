import styles from '../styles/stockStats.module.scss'
import {useState} from 'react';


const StockStats = ({ portfolioData }) => {
    const [data, setdata] = useState(portfolioData[0])
    

    const handleSelectChange = (e) => {
        setdata(portfolioData.find(port => port.portfolio_name == e.target.value))
        console.log(e.target.value)
    }



    return (
        <div className={styles.yourStats }>

            <div className={styles.row}>
                <a>Choose Portfolio</a> <select onChange={handleSelectChange}>
                    {portfolioData ?
                        portfolioData.map((row) => {
                            return (
                                <option key={row.portfolio_name} value={row.portfolio_name}> {row.portfolio_name} </option>
                            )
                        })
                        : <option value="tech">Tech</option>

                    }
                </select>
            </div>

            <div className={styles.row}>
                <a>Bought On:</a> <a>{data.firstpurchase ? data.firstpurchase.split('T')[0] : 'MM-DD-YYYY'}</a>
            </div>

            <div className={styles.row}>
                <a>Current Value:</a> <a>{data.currentValue}</a>
            </div>

            <div className={styles.row}>
                <a>Total Shares:</a> <a>{data.quantity}</a>
            </div>

        </div >
    )
}

export default StockStats;