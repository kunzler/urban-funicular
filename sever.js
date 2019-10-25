const express = require('express')
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 7000
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require("path")


//middleware for every request
app.use(express.json())
app.use(morgan('dev')) //gives updates when using CRUD
app.use(express.static(path.join(__dirname, "client", "build")))

//routes
app.use('/bookscms', require('./routes/bookRouter.js'))

//DB collection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookscmsdb',
{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => console.log("Connected to BooksCMS DB"))

//Global Error Handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on Port : ${PORT}`)
})