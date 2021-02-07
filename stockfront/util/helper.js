let tickerData = require('../assets/allTickers/nasdaq-listed-symbols_json.json')
let batchData = require('../public/fakeBatchData.json')

export const formatData = (data) => {
    //first filter all the data to get rid of dividend days
    let formattedData = data.filter((x) => {
        if (x.hasOwnProperty('type')) {
            return false
        }
        return true;
    })

    //Now map the data to convert the dates as well as round numbers

    formattedData = formattedData.map(day => {
        if (day.hasOwnProperty('type')) {
            return;
        }
        else {
            return {
                date: `${new Date(day.date * 1000).toDateString()}`,
                value: Math.round(day.close * 100) / 100
            }
        }
    })

    let allDays = {
        'today': formattedData[0],
        'lastDay': formattedData.slice(0, 2).reverse(),
        'last7Days': formattedData.slice(0, 7).reverse(),
        'lastMonth': formattedData.slice(0, 30).reverse(),
        'lastYear': formattedData.slice(0, 252).reverse()
    }


    return allDays;
}

//function to find and return companies from all tickers file

export const findCompany = (ticker) => {
    return tickerData.find((company) => {
        if (company.Symbol === `${ticker.toUpperCase()}`) {
            return true
        }
    })
}

//function to retrieve historical data from api and format it to appropriatly to be able to graph
/*
Data retrieved from query looks like this = {portfolio_name: 'bleh', stock_name: 'AAPL', date_of_sale: 'YY-MM-DD', quantity: 4, Price: 134}

1. Find the first purchase date for the protfolio, and the beginning date will be from there(from DB table)
2. Next find all symbols from the table as well, because that is needed for the API get request
2.5: Then determine the date range based on current date of request
3. Now from here we need to send a get request with all the symbols required with the API request
4. After that we have to format the data for recharts graph
5. The best way to do this is recharts takes data currently as 
    [{Date: 'MM-DD-YYYY', value: 134.13}, {Date: 'MM-DD-YYYY', value: 120.13}]
6. Value for recharts would be (share amount * latest price) + (diffCompanyShareAmount * latest price) on Day
7. Most likely going to have to compare two different arrays. One array which is from db and the other
    from the api get request. 
*/

//the following function is meant to gather portfolio data and convert it to line chart
//currently under construction
export const gatherPortfolioData = () => {
    //retrieve first purchase date
    let firstDatePoint = portfolioQuery.row[0].date_of_sale;

    //lets simplify the data received from API

    let convertDataObjToArr = (data) => {
        let jsonArray = [];
        for (const company in data) {
            let adjustedCompany = {
                symbol: company,
                chart: data[company].chart
            }
            jsonArray.push(adjustedCompany)
        }
        return jsonArray;
    }

    let fixedApiData = convertDataObjToArr(batchData)

    //this is to simplify the api values
    let simplifiedData = fixedApiData.map((company) => {
        let newCompany = {
            symbol: company.symbol,
            closeChart: company.chart.map(date => {
                return {
                    date: date.date,
                    close: date.close
                }
            })
        }
        return newCompany
    })

    //now we have to retrieve our data from the data base 

    //Now we have an array of final data points


    let allDatePoints = simplifiedData[0].closeChart.map(date => {
        return {
            Date: date.date
        }
    })

    let finalDatePoints = allDatePoints.slice(allDatePoints.findIndex(x => x.Date == '2021-01-26'))



    //With the final data points we have to add current portfolio value with that date

    //for loop start with earliest date firstDatePoint and iterate up to the day before last

    //One company portfolio value based on days 

    let fillDateValues = (dateArrToFill, userArrTransactions, apiArrWithPrices) => {
        let portVal = 0;
        let shareQuantity = 0;
        let ans = dateArrToFill.map(date => {

            let currDate = date.Date;
            //looping through the userTransactions 
            let valueToCompare = userArrTransactions.find(dateOfPurchase => dateOfPurchase.date_of_sale == currDate)
            if (valueToCompare) {
                shareQuantity += valueToCompare.quantity
                //find the latest price from api to compare
                let latestPriceOnCurrDay = apiArrWithPrices.find(date => date.date == currDate)
                portVal += latestPriceOnCurrDay ? (latestPriceOnCurrDay.close * valueToCompare.quantity) : (valueToCompare.price * valueToCompare.quantity)
                return {
                    Date: currDate,
                    value: portVal
                }
            }
            //if undefined
            else {
                return {
                    Date: currDate,
                    value: portVal
                }
            }


        })

        return ans;

    }



    let finalArray = [
        {
            Date: 'MM-DD-YYYY',
            portfolioValue: (sharesOnthatDay * priceOnThatDay) // + whatever else on that given
        }
    ]


}

//following function will gather portfolio data and turn into a pie chart;
export const portfolioDataPieChart = () => {
    
}