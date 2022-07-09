const mongoose = require("mongoose");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

//DB Connection
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, ()=>{
    console.log("Connected to MongoDB")
});

//use parsing middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//import routes
const userRoutes = require('./routes/user')
//use routes
app.use('/api', userRoutes)

const port = process.env.PORT || 8000

//Start server
app.listen(port, () => {
    console.log(`App is running at ${port}`)
})