import express, { json } from 'express'
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

// routes import
import jobRouter from './routes/job.route.js'


// routes declaration
app.use("/api/v1/jobs", jobRouter)



app.use("*", (req, res)=>{
    res.status(404).json({msg: "Not Found"})
})

app.use((err, req, res, next)=>{
    res.status(500).json({msg: "something went wrong"})
})

const port = process.env.PORT || 5100
app.listen(process.env.PORT, (req, res)=>{
    console.log('Server is running on port ', port)
})