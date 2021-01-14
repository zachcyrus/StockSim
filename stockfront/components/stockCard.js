const StockCard = () => {
    return (
        <div className='stockCard'>


            <div className="stockName">
                <div className="stockImg"></div>
                <div className="stockGroup">
                    <h3>AAPL</h3>
                    <h3>Apple Inc.</h3>
                </div>

            </div>

            <div className="stockMoney">
                <h3>$1000.76</h3>
                <h4>+14.87%</h4>
            </div>

        </div>
    )
}

export default StockCard;