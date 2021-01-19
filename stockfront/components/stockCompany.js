import StockChart from './stockChart';
import { useState } from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import styles from '../styles/stockCompany.module.scss'


//Might need to make a custom chart component for Portfolios

const StockCompany = () => {
    const [open, setDisplay] = useState(false);
    const [buy, setBuy] = useState(false);
    const [sell, setSell] = useState(false);
    const [timeTravel, setTimeTrav] = useState(false);

    const toggleBuy = () => {
        if (open) {
            setBuy(false)
            setDisplay(false)
        }
        else {
            setBuy(true)
            setDisplay(true)
        }
    }

    const toggleSell = () => {
        if (open) {
            setSell(false)
            setDisplay(false)
        }
        else {
            setSell(true)
            setDisplay(true)
        }
    }

    const toggleTimeTrav = () => {
        if (open) {
            setTimeTrav(false)
            setDisplay(false)
        }
        else {
            setTimeTrav(true)
            setDisplay(true)
        }
    }

    //Maybe consider turning the modal into a seperate component
    //Also need a state component to determine arrow direction for stock increase or decrease


    return (
        <div className={styles.stockCompany}>
            <div className={styles.stockHeader}>
                <h3 style={{ textAlign: 'left' }}>AAPL</h3>
                <h3>Apple Inc</h3>
                <div className={styles.value}>
                    <a>158.87</a>
                    <a> <ArrowDropUpIcon fontSize='large' /> 10.14 (+8.56%)</a>
                </div>

            </div>

            <div className={styles.yourStats}>
                <h3>Your Stats</h3>
                <div className={styles.row}>
                    <a>Bought On:</a> <a>MM-DD-YYYY</a>
                </div>

                <div className={styles.row}>
                    <a>Peak Value:</a> <a>$3,000 on 01/20/2019</a>
                </div>

                <div className={styles.row}>
                    <a>Percent:</a> <a>30%</a>
                </div>
            </div>


            <StockChart />

            


            <div style={{ textAlign: 'center' }} className={styles.news}>
                <h3>Latest News</h3>
                <p>
                    Dow Jones futures will open Sunday evening, along with S&P 500 futures and Nasdaq futures. The stock market rally fell last week as buzz from the Biden stimulus plan began to wane. But it was a constructive pullback.
                </p>
            </div>

            <div className={styles.buttonGroup}>
                <button onClick={toggleBuy}>BUY</button>
                <button onClick={toggleSell} className={styles.sellBtn}>SELL</button>
                <button onClick={toggleTimeTrav}>Time Travel</button>
            </div>


            <div style={{ display: open ? 'block' : 'none' }} className={styles.modal}>

                <div style={{ display: buy ? 'block' : 'none' }} className={styles.modalContent}>
                    <h1>BUY</h1>
                    <div className={styles.row}>
                        <a>Current Price:</a> <a>$158.87</a>
                    </div>

                    <div className={styles.row}>
                        <a>Amount:</a> <a>x <input type='number'></input></a>
                    </div>

                    <div className={styles.row}>
                        <a>Total Cost:</a> <a>$635.48</a>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button>ORDER</button>
                        <button onClick={toggleBuy} className={styles.cancel}>CANCEL</button>
                    </div>
                </div>

                <div style={{ display: sell ? 'block' : 'none' }} className={styles.modalContent}>
                    <h1>SELL</h1>
                    <div className={styles.row}>
                        <a>Current Price:</a> <a>$158.87</a>
                    </div>

                    <div className={styles.row}>
                        <a>Amount:</a> <a>x <input type='number'></input></a>
                    </div>

                    <div className={styles.row}>
                        <a>Total Cost:</a> <a>$635.48</a>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button>SELL</button>
                        <button onClick={toggleSell} className={styles.cancel}>CANCEL</button>
                    </div>
                </div>

                <div style={{ display: timeTravel ? 'block' : 'none' }} className={styles.modalContent}>
                    <h1>Time Travel Purchase</h1>
                    <div className={styles.row}>
                        <a>Date of Purchase</a> <a> <input type="date" /> </a>
                    </div>
                    <div className={styles.row}>
                        <a>Value:</a> <a>$158.87</a>
                    </div>

                    <div className={styles.row}>
                        <a>Amount:</a> <a>x <input type='number'></input></a>
                    </div>

                    <div className={styles.row}>
                        <a>Total Cost:</a> <a>$635.48</a>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button>BUY</button>
                        <button onClick={toggleTimeTrav} className={styles.cancel}>CANCEL</button>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default StockCompany;