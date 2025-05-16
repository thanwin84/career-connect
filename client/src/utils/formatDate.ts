
const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  
  type Category = "m" | "h" 
  function formatText(value: number, category:Category){
    const categorites = {
      m: {singular: "minute ago", plural: "minutes ago"},
      h: {singular: "hour ago", plural: "hours ago"}
    }
    return value > 1 ? `${value} ${categorites[category].plural}`: `${value} ${categorites[category].singular}`
  }
  
  export default function formatDate(currentDate:string){
    const date = new Date(currentDate)
    const now = new Date()
    const miliDiff = now.getTime() - date.getTime()
    const minutes = Math.floor(miliDiff / (1000 * 60))
    const hours = Math.floor(miliDiff / (1000 * 60 * 60))
    let readableTime = ""
    if (minutes < 60){
      readableTime = formatText(minutes, 'm')
    }
    else if (hours < 24){
      readableTime = formatText(hours, 'h')
    } else if (hours >= 24 && hours < 48){
      readableTime = "Yesterday"
    } else {
      const day = date.getDate()
      const year = date.getFullYear()
      const month = months[date.getMonth()]
      readableTime = `on ${day} ${month}, ${year}`
  
    }
    return readableTime
  }
  
  
  