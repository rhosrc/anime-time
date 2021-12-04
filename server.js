// Require dependencies

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const collectedController = require('./controllers/collected');

// Initialize app

const app = express();

// Configure settings

require('dotenv').config();

// Connect to MongoDB with Mongoose

mongoose.connect(process.env.DATABASE_URL);

// Define Mongoose Callbacks

const db = mongoose.connection;
db.on('error', function (err) {
    console.log(err.message + 'is mongo not running?');
})
db.on('connected', function (){
    console.log('mongo connected');
})
db.on('disconnected', function (){
    console.log('mongo disconnected');
})

// Axios Playground



// API Details





// const searchResult = 

// API Routes




// Mount middleware

app.use(express.static('public')); // for public folder access
app.use(express.urlencoded({ extended: false })); // for req.body
app.use(methodOverride('_method')); // for delete and edit functionality


// Mount routes

app.use('/', collectedController);


// Listen

const PORT = process.env.PORT;
app.listen(PORT, function (){
    console.log(`Express is listening on port: ${PORT}`);
})


