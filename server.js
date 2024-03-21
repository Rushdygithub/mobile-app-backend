const express =  require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

//Middlewares
app.use(express.json())

const connection = async () => {

    await mongoose.connect('mongodb+srv://mohomedrushdi972:VdQUBg594m9WIBWP@cluster0.ugl975h.mongodb.net/')
    .then(()=> {
        console.log('Connected')
    })
    .catch((error)=> {
        console.log(`Connection is interrupted, ${error.message}`)
    })
} 

module.exports = {
    connection
}