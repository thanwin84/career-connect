import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
dotenv.config()


const app = express()

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


// parse incoming json request
app.use(express.json())
//parse incoming URL-enconded data with extended options and limit of 16kb
app.use(express.urlencoded({extended: true, limit: "16kb"}))


app.get('/', (req, res)=>{
    res.send("hello world")
})

app.post('/', (req, res)=>{
    console.log(req.body)
    res.json({message: "data recieved", data: req.body})
})
const port = process.env.PORT || 5100
app.listen(process.env.PORT, (req, res)=>{
    console.log('Server is running on port ', port)
})