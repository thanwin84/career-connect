import express, { json } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import connectToDB from './db/index.js'
import errorHandler from './middleware/errorHandler.js'
import cookieParser from 'cookie-parser'
dotenv.config()



const app = express()

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


// parse incoming json request
app.use(express.json())
//parse incoming URL-enconded data with extended options and limit of 16kb
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())



// routes import
import jobRouter from './routes/job.route.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'

// routes declaration
app.use("/api/v1/jobs", jobRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)



app.use("*", (req, res)=>{
    res.status(404).json({msg: "Not Found"})
})


app.use(errorHandler)

const port = process.env.PORT || 5100


connectToDB()
.then(()=>{
    app.listen(process.env.PORT, (req, res)=>{
        console.log('Server is running on port ', port)
    })
}).catch(error => console.log("mongodb connection failed error ", error))