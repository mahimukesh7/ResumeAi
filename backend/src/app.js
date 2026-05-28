const express = require("express")
const cookieParser =require("cookie-parser")
const cors = require("cors")
const interviewRouter =require("../routes/interview.routes")
const app = express()
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use("/api/interview",interviewRouter)

app.use(express.urlencoded({ extended: true }))
const authRouter= require("../routes/auth.route")
app.use("/api/auth",authRouter)


module.exports = app