const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const mongoose = require('mongoose');
const Bookmark = require('./model/Recipie');
const routepath  = require('./Router/router')


const app = express();

mongoose.connect("mongodb://127.0.0.1/finalExam", {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.use('/',routepath)





app.listen(4000, () => {
    console.log("Server on port 4000");
});