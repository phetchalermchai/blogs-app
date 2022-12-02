const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require("dotenv").config()
const blogRoute = require("./routes/blog")
const authRoute = require ("./routes/auth")

const app = express()


//connect database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=>console.log("เชื่อมต่อสำเร็จ")).catch((err)=>console.log(err))

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//route
app.use("/api",blogRoute)
app.use("/api",authRoute)



const port = process.env.PORT || 80
app.listen(port, function () {
  console.log('CORS-enabled web server listening on port '+port)
})