
export default  function  formatDate(date:Date){
    const dateObject = new Date(date)
    const day = dateObject.getDay()
    const month = dateObject.getMonth()
    const year = dateObject.getFullYear()

    return `${day}/${month}/${year}`
}