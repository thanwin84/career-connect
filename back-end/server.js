import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import connectToDB from './db/index.js'
import errorHandler from './middleware/errorHandler.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'



const app = express()

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


// parse incoming json request
app.use(express.json())
//parse incoming URL-enconded data with extended options and limit of 16kb
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())
app.use(cors())



// routes import
import jobRouter from './routes/job.route.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import recordsRouter from './routes/records.route.js'

// public
import path, {dirname} from "path"
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))


// routes declaration
app.use("/api/v1/jobs", jobRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/records", recordsRouter)


app.use(express.static(path.resolve(__dirname, "./public")))
app.get("/health", (req, res)=>{
    res.send({success: "true"})
})


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