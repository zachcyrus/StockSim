import StockChart from './stockChart';
import { useState } from 'react';

//Might need to make a custom chart component for Portfolios

const StockCompany = () => {
    const [open, setDisplay] = useState(false);
    const [buy, setBuy] = useState(false);
    const [sell, setSell] = useState(false);
    const [timeTravel, setTimeTrav] = useState(false);

    const toggleBuy = () => {
        if(open){
            setBuy(false)
            setDisplay(false)
        }
        else{
            setBuy(true)
            setDisplay(true)
        }
    }

    const toggleSell = () => {
        if(open){
            setSell(false)
            setDisplay(false)
        }
        else{
            setSell(true)
            setDisplay(true)
        }
    }

    const toggleTimeTrav = () => {
        if(open){
            setTimeTrav(false)
            setDisplay(false)
        }
        else{
            setTimeTrav(true)
            setDisplay(true)
        }
    }

    //Need a function to determine which modal to open


    return (
        <div className="stockCompany">
            <h3 style={{ textAlign: 'left' }}>AAPL</h3>
            <h3>Apple Inc</h3>
            <div className="value">
                <a>158.87</a>
                <a> ^ 10.14 (+8.56%)</a>
            </div>

            <StockChart />


            <div style={{ textAlign: 'center' }} className="news">
                <h3>Latest News</h3>
                <p>
                    Dow Jones futures will open Sunday evening, along with S&P 500 futures and Nasdaq futures. The stock market rally fell last week as buzz from the Biden stimulus plan began to wane. But it was a constructive pullback.
                </p>
            </div>

            <div className="buttonGroup">
                <button onClick={toggleBuy}>BUY</button>
                <button onClick={toggleSell} className="sellBtn">SELL</button>
                <button onClick={toggleTimeTrav}>Time Travel</button>
            </div>


            <div style = {{display: open ? 'block' : 'none'}} className='modal'>
                
                <div style = {{display: buy ? 'block' : 'none'}} className='buy modal-content'>
                    <h1>BUY</h1>
                    <div className="row">
                        <a>Current Price:</a> <a>$158.87</a>
                    </div>

                    <div className="row">
                        <a>Amount:</a> <a>x <input type='number'></input></a>
                    </div>

                    <div className="row">
                        <a>Total Cost:</a> <a>$635.48</a>
                    </div>

                    <div className="buttonGroup">
                        <button>ORDER</button>
                        <button onClick={toggleBuy} className="cancel">CANCEL</button>
                    </div>
                </div>

                <div style = {{display: sell ? 'block' : 'none'}} className='sell modal-content'>
                    <h1>SELL</h1>
                    <div className="row">
                        <a>Current Price:</a> <a>$158.87</a>
                    </div>

                    <div className="row">
                        <a>Amount:</a> <a>x <input type='number'></input></a>
                    </div>

                    <div className="row">
                        <a>Total Cost:</a> <a>$635.48</a>
                    </div>

                    <div className="buttonGroup">
                        <button>SELL</button>
                        <button onClick={toggleSell} className="cancel">CANCEL</button>
                    </div>
                </div>

                <div style = {{display: timeTravel ? 'block' : 'none'}} className='timeTravel modal-content'>
                    <h1>Time Travel Purchase</h1>
                    <div className="row">
                        <a>Date of Purchase</a> <a> <input type="date"/> </a>
                    </div>
                    <div className="row">
                        <a>Value:</a> <a>$158.87</a>
                    </div>

                    <div className="row">
                        <a>Amount:</a> <a>x <input type='number'></input></a>
                    </div>

                    <div className="row">
                        <a>Total Cost:</a> <a>$635.48</a>
                    </div>

                    <div className="buttonGroup">
                        <button>BUY</button>
                        <button onClick={toggleTimeTrav} className="cancel">CANCEL</button>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default StockCompany;