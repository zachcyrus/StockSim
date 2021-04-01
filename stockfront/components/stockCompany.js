import StockChart_Data from './stockChart&Data'
import { useState } from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import styles from '../styles/stockCompany.module.scss'
import axios from 'axios';
import StockStats from './stockStats'

//Might need to make a custom chart component for Portfolios

const StockCompany = ({ companyInfo, allPortfolios, statData, apiUrl, token }) => {
    const [open, setDisplay] = useState(false);
    const [buy, setBuy] = useState(false);
    const [sell, setSell] = useState(false);
    const [timeTravel, setTimeTrav] = useState(false);
    const [portfolioName, setportfolioName] = useState('')
    const [shareAmount, setShareAmount] = useState(0);
    const [error, setError] = useState('');
    const [selectedDate, setDate] = useState('');
    const [timeTravelPrice, setTimeTravelPrice] = useState('Pick a date')
    const [sharesOwned, setSharesOwned] = useState(statData 
        ? statData.find(port => port.portfolio_name == portfolioName) 
        ? statData.find(port => port.portfolio_name == portfolioName).quantity : 0 : '')
    const [sellSharesOwned, setSellSharesOwned] = useState(statData 
        ? statData.find(port => port.quantity !== undefined) 
        ? statData.find(port => port.quantity !== undefined).quantity : 0 : '')

    const stockTicker = companyInfo.ticker;
    const todaysPrice = companyInfo.todaysPrice;

    const handleSelect = (e) => {
        setportfolioName(e.target.value)
        setSharesOwned(statData.find(port => port.portfolio_name == e.target.value) ? statData.find(port => port.portfolio_name == e.target.value).quantity : 0)
        setSellSharesOwned(statData.find(port => port.portfolio_name == e.target.value) ? statData.find(port => port.portfolio_name == e.target.value).quantity : 0)
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
        if (portfolioName === '') {
            setError('Make a portfolio or select first')
            setTimeout(() => {
                setError('')
            }, 10000);
            return;
        }
        if(portfolioName === 'Select Your Portfolio'){
            setError('Select a portfolio')
            setTimeout(() => {
                setError('')
            }, 10000);
            return;
        }
        if (!Number.isInteger(+shareAmount)) {
            setError('Please only use positive integers for share amount')
            setTimeout(() => {
                setError('')
            }, 10000);
            return;
        }
        else if (Math.sign(shareAmount) == -1) {
            setError('Please only use positive integers for share amount')
            setTimeout(() => {
                setError('')
            }, 10000);
            return;
        }
        try {
            let addStockToPortfolio = await axios
                .post(`${apiUrl}/stocks/buy`,
                    {
                        portfolioName: portfolioName,
                        quantity: shareAmount,
                        price: (Math.round(todaysPrice * 100) / 100),
                        stockName: stockTicker
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                })
            window.location.reload();

        } catch (err) {
            console.log(err)
        }

    }

    const handleSell = async (e) => {
        e.preventDefault()
        if (portfolioName === '') {
            setError('Make or select portfolio first')
            setTimeout(() => {
                setError('')
            }, 10000);
            return;
        }
        if(portfolioName === 'Select Your Portfolio'){
            setError('Select a portfolio')
            setTimeout(() => {
                setError('')
            }, 10000);
            return;
        }
        if(shareAmount == 0){
            setError('Share amount must be greater than 0')
            setTimeout(() => {
                setError('')
            }, 10000);
            return;
        }
        if (!Number.isInteger(+shareAmount)) {
            setError('Please only use positive integers for share amount')
            setTimeout(() => {
                setError('')
            }, 10000);
            return;
        }
        else if (Math.sign(shareAmount) == -1) {
            setError('Please only use positive integers for share amount')
            setTimeout(() => {
                setError('')
            }, 10000);
            return;

        }

        if (shareAmount > sellSharesOwned) {
            setError("Can't sell more shares than you own")
            setTimeout(() => {
                setError('')
            }, 10000);
            return;

        }
        try {
            console.log(portfolioName)
            let removeStockFromPortfolio = await axios
                .post(`${apiUrl}/stocks/sell`,
                    {
                        portfolioName: portfolioName,
                        quantity: shareAmount,
                        price: (Math.round(todaysPrice * 100) / 100),
                        stockName: stockTicker
                    }, { headers: {
                        Authorization: `Bearer ${token}`
                      } })
            window.location.reload();

        } catch (err) {
            console.log(err)
        }
    }

    const handleTimeTravel = async (e) => {
        e.preventDefault()
        console.log(portfolioName)
        if (portfolioName === '') {
            setError('Make or select a portfolio first')
            setTimeout(() => {
                setError('')
            }, 10000);
            return;
        }
        if (!Number.isInteger(+shareAmount)) {
            setError('Please only use positive integers for share amount')
            setTimeout(() => {
                setError('')
            }, 10000);
            return;
        }
        else if (Math.sign(shareAmount) == -1) {
            setError('Please only use positive integers for share amount')
            setTimeout(() => {
                setError('')
            }, 10000);
            return;
        }

        //checks if it's the weekend
        let origDate = new Date(selectedDate.replace(/-/g, '\/'))
        if (origDate.getDay() == 6 || origDate.getDay() == 0) {
            setError('Stock Market is closed on weekends')
            setTimeout(() => {
                setError('')
            }, 10000);
            return;
        }
        try {
            let addStockToPortfolio = await axios
                .post(`${apiUrl}/stocks/buy/timetravel`,
                    {
                        portfolioName: portfolioName,
                        quantity: shareAmount,
                        date: selectedDate,
                        price: (Math.round(timeTravelPrice * 100) / 100),
                        stockName: stockTicker
                    }, { headers: {
                        Authorization: `Bearer ${token}`
                      } })
            window.location.reload();

        } catch (err) {
            console.log(err)
        }
    }

    const handleDateChange = async (e) => {
        e.preventDefault();
        let currDate = e.target.value;
        setDate(e.target.value)
        let formatDate = currDate.split('-').join('');
        try {
            let newPrice = await axios
                .get(`${apiUrl}/stocks/timetravelquote/${stockTicker}/${formatDate}`,
                    { headers: {
                        Authorization: `Bearer ${token}`
                      } })

            setTimeTravelPrice(newPrice.data.price)
        } catch (err) {
            console.log(err)

        }

    }

    //Maybe consider turning the modal into a seperate component
    //Also need a state component to determine arrow direction for stock increase or decrease


    return (
        <div className={styles.stockCompany}>
            <div className={styles.stockHeader}>
                <h3 style={{ textAlign: 'left' }}>{companyInfo.ticker}</h3>
                <h3>{companyInfo.name}</h3>
                <div className={styles.value}>
                    <a>${companyInfo.todaysPrice}</a>
                    <a> {Math.sign(companyInfo.percentChange) == 1 ?
                        <ArrowDropUpIcon className={styles.arrow} />
                        : <ArrowDropDownIcon className={styles.arrow} />} {companyInfo.valueChange} ({companyInfo.percentChange}%)
                    </a>
                </div>



            </div>

            <div className={styles.yourStats}>
                {statData == undefined ? <a className={styles.loginLink} href='/login'><h2>Login to view stats</h2></a> :
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
                    News feature will be added shortly.
                </p>
            </div>

            <div className={styles.buttonGroup}>
                <button onClick={toggleBuy} className={styles.buyBtn}>BUY</button>
                <button onClick={toggleSell} className={styles.sellBtn}>SELL</button>
                <button onClick={toggleTimeTrav} className={styles.ttBtn}>Time Travel</button>
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

                    <div className={styles.row}>
                        <a>Amount In Portfolio:</a> <a>{sharesOwned ? `${sharesOwned}` : 'None in portfolio'}</a>
                    </div>

                    <div style={{ color: 'red' }}>{error}</div>

                    <div className={styles.row}>
                        <a>Select Portfolio</a> <select onChange={handleSelect} name="portfolios">
                            <option value='Select Your Portfolio'>Select Your Portfolio</option>
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

                    <div style={{ color: 'red' }}>{error}</div>


                    <div className={styles.row}>
                        <a>Select Portfolio</a> <select onChange={handleSelect} name="portfolios">
                            <option value='Select Your Portfolio'>Select Your Portfolio</option>
                            {statData ?
                                statData.map((row) => {
                                    return (
                                        <option key={row.portfolio_name} value={row.portfolio_name}> {row.portfolio_name} </option>
                                    )
                                })
                                : <option value="tech">Tech</option>

                            }
                        </select>
                    </div>

                    <div className={styles.row}>
                        <a>Amount In Portfolio:</a> <a>{sellSharesOwned ? `${sellSharesOwned}` : 'None in portfolio'}</a>
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
                        <a>Date of Purchase</a> <a> <input onChange={handleDateChange} type="date" max={new Date().toISOString()
                            .split("T")[0]} /> </a>
                    </div>
                    <div className={styles.row}>
                        <a>Value:</a> <a>{timeTravelPrice}</a>
                    </div>

                    <div className={styles.row}>
                        <a>Amount:</a> <a>x <input onChange={handleShareChange} type='number'></input></a>
                    </div>

                    <div style={{ color: 'red' }}>{error}</div>


                    <div className={styles.row}>
                        <a>Select Portfolio</a>
                        <select onChange={handleSelect} name="portfolios">
                        <option value='Select Your Portfolio'>Select Your Portfolio</option>
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
                        <a>Total Cost:</a> <a>{isNaN(timeTravelPrice) ? timeTravelPrice : shareAmount * timeTravelPrice}</a>
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