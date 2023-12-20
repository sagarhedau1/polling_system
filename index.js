//Require express module to create new express app
const express = require('express');
//Create new instance of express app
const app = express();
const PORT = 3000;
const db = require('./config/mongoose')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',require('./routes'))

app.listen(PORT, (err)=>{
    if(err){
        console.log(err)
        return;
    }
    console.log("SERVER IS UP AND RUNNING AT PORT-----> ", PORT)
})
