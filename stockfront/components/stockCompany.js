import StockChart_Data from './stockChart&Data'
import { useState } from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import styles from '../styles/stockCompany.module.scss'
import axios from 'axios';
import StockStats from './stockStats'

//Might need to make a custom chart component for Portfolios

const StockCompany = ({ companyInfo, allPortfolios, statData }) => {
    const [open, setDisplay] = useState(false);
    const [buy, setBuy] = useState(false);
    const [sell, setSell] = useState(false);
    const [timeTravel, setTimeTrav] = useState(false);
    const [portfolioName, setportfolioName] = useState(allPortfolios ? allPortfolios[0].portfolio_name : 'Tech')
    const [shareAmount, setShareAmount] = useState(0);
    const [error, setError] = useState('')

    const stockTicker = companyInfo.ticker;
    const todaysPrice = companyInfo.todaysPrice;


    const handleSelect = (e) => {
        setportfolioName(e.target.value)
        console.log(e.target.value)

    }

    const toggleBuy = () => {
        if (open) {
            setBuy(false)
            setDisplay(false)
            setShareAmount(0)
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
            setShareAmount(0)
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
            setShareAmount(0)
        }
        else {
            setTimeTrav(true)
            setDisplay(true)
        }
    }

    const handleShareChange = (e) => {
        setShareAmount(e.target.value)
    }

    const handleBuy = async (e) => {
        e.preventDefault()
        if(!Number.isInteger(+shareAmount)){
            setError('Please only use integers for share amount')
            setTimeout(() => {
                setError('')
            }, 10000);
            return;
        }
        try {
            let addStockToPortfolio = await axios
            .post(`${process.env.NEXT_PUBLIC_APIURL}/stocks/buy`,
                {
                    portfolioName: portfolioName,
                    quantity: shareAmount,
                    price: (Math.round(todaysPrice * 100) / 100),
                    stockName: stockTicker
                }, { withCredentials: true })
            console.log(`Just bought a share: ${shareAmount}`)
            window.location.reload();
            
        } catch (err) {
            console.log(err)
        }
        
    }

    const handleSell = (e) => {
        e.preventDefault()
        console.log('Just bought a share')
    }

    const handleTimeTravel = (e) => {
        e.preventDefault()
        console.log('Just bought a share')
    }

    //Maybe consider turning the modal into a seperate component
    //Also need a state component to determine arrow direction for stock increase or decrease


    return (
        <div className={styles.stockCompany}>
            <div className={styles.stockHeader}>
                <h3 style={{ textAlign: 'left' }}>{companyInfo.ticker}</h3>
                <h3>{companyInfo.name}</h3>
                <div className={styles.value}>
                    <a>{companyInfo.todaysPrice}</a>
                    <a> <ArrowDropUpIcon fontSize='large' /> 10.14 (+8.56%)</a>
                </div>

            </div>

            <div className={styles.yourStats}>
                {statData == undefined ? <h2>Login to view stats</h2> : 
                <div>
                    <h3>Your Stats</h3>
                    {statData.length > 0 ? <StockStats portfolioData={statData} /> : <h2>Stock not found in any portfolios</h2>}
                </div>
                
                }
                

            </div>


            <StockChart_Data data={companyInfo.YearData} />




            <div style={{ textAlign: 'center' }} className={styles.news}>
                <h3>Latest News</h3>
                <p>
                    Dow Jones futures will open Sunday evening, along with S&P 500 futures and Nasdaq futures. The stock market rally fell last week as buzz from the Biden stimulus plan began to wane. But it was a constructive pullback.
                </p>
            </div>

            <div className={styles.buttonGroup}>
                <button onClick={toggleBuy} className={styles.buyBtn}>BUY</button>
                <button onClick={toggleSell} className={styles.sellBtn}>SELL</button>
                <button onClick={toggleTimeTrav}>Time Travel</button>
            </div>


            <div style={{ display: open ? 'block' : 'none' }} className={styles.modal}>

                <div style={{ display: buy ? 'block' : 'none' }} className={styles.modalContent}>
                    <h1>BUY</h1>
                    <div className={styles.row}>
                        <a>Current Price:</a> <a>{todaysPrice}</a>
                    </div>

                    <div className={styles.row}>
                        <a>Amount(integers only):</a> <a>x <input onChange={handleShareChange} type='number' value={shareAmount}></input></a>
                    </div>

                    <div style={{color:'red'}}>{error}</div>

                    <div className={styles.row}>
                        <a>Select Portfolio</a> <select onChange={handleSelect} name="portfolios">
                            {allPortfolios ?
                                allPortfolios.map((row) => {
                                    return (
                                        <option key={row.portfolio_name} value={row.portfolio_name}> {row.portfolio_name} </option>
                                    )
                                })
                                : <option value="tech">Tech</option>

                            }

                        </select>
                    </div>

                    <div className={styles.row}>
                        <a>Total Cost:</a> <a>{shareAmount * todaysPrice}</a>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button onClick={handleBuy}>ORDER</button>
                        <button onClick={toggleBuy} className={styles.cancel}>CANCEL</button>
                    </div>
                </div>

                <div style={{ display: sell ? 'block' : 'none' }} className={styles.modalContent}>
                    <h1>SELL</h1>
                    <div className={styles.row}>
                        <a>Current Price:</a> <a>{todaysPrice}</a>
                    </div>

                    <div className={styles.row}>
                        <a>Amount:</a> <a>x <input onChange={handleShareChange} type='number'></input></a>
                    </div>

                    <div className={styles.row}>
                        <a>Select Portfolio</a> <select name="portfolios">
                            {allPortfolios ?
                                allPortfolios.map((row) => {
                                    return (
                                        <option key={row.portfolio_name} value={row.portfolio_name}> {row.portfolio_name} </option>
                                    )
                                })
                                : <option value="tech">Tech</option>

                            }
                        </select>
                    </div>

                    <div className={styles.row}>
                        <a>Total Cost:</a> <a>{shareAmount * todaysPrice}</a>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button onClick={handleSell}>SELL</button>
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
                        <a>Amount:</a> <a>x <input onChange={handleShareChange} type='number'></input></a>
                    </div>

                    <div className={styles.row}>
                        <a>Select Portfolio</a>
                        <select name="portfolios">
                            {allPortfolios ?
                                allPortfolios.map((row) => {
                                    return (
                                        <option key={row.portfolio_name} value={row.portfolio_name}> {row.portfolio_name} </option>
                                    )
                                })
                                : <option value="tech">Tech</option>

                            }
                        </select>
                    </div>

                    <div className={styles.row}>
                        <a>Total Cost:</a> <a>{shareAmount * todaysPrice}</a>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button onClick={handleTimeTravel}>BUY</button>
                        <button onClick={toggleTimeTrav} className={styles.cancel}>CANCEL</button>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default StockCompany;