const express = require("express") ;
const cors = require("cors")

//db connection and env
require("dotenv").config({path : "./config/.env"})
require("./config/db")

//routes 
const routes= require('./routes/routes')
//our app
const app = express() ;
    
//middlewares 
app.use(express.json()) //for parsing json data in request body
app.use(cors());

//listening port
const port = process.env.PORT || 5000

//APIs available in http://localhost:5000/api/
app.use("/api",routes)

//listening 
app.listen(port, ()=>{
    console.log(`server is running on ${port}...`)
})