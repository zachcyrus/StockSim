import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { useState } from 'react';
import { formatData } from '../util/helper'
const appleData = require('../public/sampleAAPL52.json')


let allValues = formatData(appleData.prices)


const StockChart_Data = () => {
    const [Data, setData] = useState(allValues.lastDay)

    const handleDataChange = (e) => {
        e.preventDefault();
        let val = e.target.innerHTML;
        switch (val) {
            case 'Day':
                setData(allValues.lastDay)
                break;
            case 'Week':
                setData(allValues.last7Days)
                break;
            case 'Month':
                setData(allValues.lastMonth)
                break;
            case 'Year':
                setData(allValues.lastYear)
                break;
            default:
                break;
        }

    }


    return (
        <div style={{color:'black'}} className='chartData'>
            <ResponsiveContainer width={'99%'} height={500}>
                <LineChart data={Data}>
                    <Line type="monotone" dataKey="value" dot={false} stroke="#8884d8" />
                    <XAxis dataKey="date" tickCount={2} color="black" fontFamily="sans-serif" stroke="white" />
                    <YAxis width={40} stroke="white" />
                    <Tooltip color='black' />
                </LineChart>

            </ResponsiveContainer>

            {/**Buttons to adjust length of time for data */}

            <div className='chartButtons'>
                <button onClick={handleDataChange}>Day</button>
                <button onClick={handleDataChange}>Week</button>
                <button onClick={handleDataChange}>Month</button>
                <button onClick={handleDataChange}>Year</button>
            </div>
        </div>
    )
}



export default StockChart_Data;