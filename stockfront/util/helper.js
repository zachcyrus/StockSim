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
        if(day.hasOwnProperty('type')){
            return;
        }
        else{
            return {
                date: `${new Date(day.date * 1000).toDateString()}`,
                value: Math.round(day.close*100)/100
            }
        }
    })
    
    let allDays = {
        'lastDay': formattedData.slice(0,2).reverse(),
        'last7Days': formattedData.slice(0,7).reverse(),
        'lastMonth': formattedData.slice(0,30).reverse(),
        'lastYear': formattedData.slice(0,252).reverse()
    }
    

    return allDays;
}
