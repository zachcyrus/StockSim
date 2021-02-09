import styles from '../styles/portfolioSummaries.module.scss';
import AllPortfoliosPieChart from './allPortfoliosPieChart'
import { useRouter } from 'next/router'


const PortfolioSummary = ({allPortfoliosData}) => {
    let totalValue = allPortfoliosData.reduce((acc,portfolio) => {
        return acc + portfolio.latestValue;
    },0)

    return (
        <div className={styles.portfolioSummary}>
            <h1>All Portfolios Summary</h1>
            <AllPortfoliosPieChart allPortfoliosData={allPortfoliosData}/>
            <h1>{`Total value: ${totalValue}`}</h1>
        </div>

    )
}

export default PortfolioSummary;