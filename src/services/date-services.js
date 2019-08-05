const DateService = {
    createDate(dateString){
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        const year = dateString.slice(2,4)
        const month = dateString.slice(5,7)
        const date = dateString.slice(8,10)
        const monthString = months[month-1]
        return ` ${date}-${monthString} ${year}`
    }
}

export default DateService