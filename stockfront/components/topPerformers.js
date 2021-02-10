import styles from '../styles/topPerformers.module.scss'
import PerformanceCard from './performanceCard'
const TopPerformers = ({ data }) => {
    let sortedData = data.sort((a, b) => b.percentIncOrDec - a.percentIncOrDec)
    sortedData = sortedData.slice(0, 3)
    return (
        <div className={styles.topPerformers}>
            {sortedData.map(portfolio => {
                return <PerformanceCard key={portfolio.stock_name} stockInfo={portfolio} />
            })}
        </div>
    )
}


export default TopPerformers;