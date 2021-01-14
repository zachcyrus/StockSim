import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
const stockData = [
    {
        date: '10-10-12',
        value: 132.87
    },
    {
        date: '10-11-12',
        value: 131.87
    },
    {
        date: '10-12-12',
        value: 130.87
    },
    {
        date: '10-13-12',
        value: 133.87
    },
    {
        date: '10-14-12',
        value: 145.87
    },
    {
        date: '10-15-12',
        value: 120.87
    },
    {
        date: '10-16-12',
        value: 121.87
    }
]
const StockChart = () => {
    console.log(stockData)
    return (
        <div className='chartData'>
            <ResponsiveContainer width='100%' height={500}>
                <LineChart data={stockData}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    <XAxis dataKey="date" stroke="white" />
                    <YAxis width={40} stroke="white" dataKey="value" />
                </LineChart>

            </ResponsiveContainer>

            {/**Buttons to adjust length of time for data */}

            <div className='chartButtons'>
                <button>1D</button>
                <button>1W</button>
                <button>1M</button>
                <button>1Y</button>
            </div>
        </div>
    )

}



export default StockChart;