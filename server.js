// Require dependencies

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const collectedController = require('./controllers/collected');
const usersController = require('./controllers/users');



// Initialize app

const app = express();

// Configure settings

require('dotenv').config();

// Connect to MongoDB with Mongoose

// PORT

const {PORT, DATABASE_URL, SECRET} = process.env || 3000;


mongoose.connect(process.env.DATABASE_URL);

// Define Mongoose Callbacks

const db = mongoose.connection;
db.on('error', function (err) {
    console.log(err.message + 'is mongo not running?');
})
db.on('connected', function () {
    console.log('mongo connected');
})
db.on('disconnected', function () {
    console.log('mongo disconnected');
})

// Axios Playground



// API Details





// const searchResult = 

// API Routes




// Mount middleware


app.use(express.static('public')); // for public folder access
app.use(express.urlencoded({
    extended: false
})); // for req.body
app.use(methodOverride('_method')); // for delete and edit functionality
app.use(morgan('dev'));
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(async function(req, res, next) {
    if(req.session && req.session.user) {
        const user = await require('./models/user').findById(req.session.user)
        res.locals.user = user;
    } else {
        res.locals.user = null;
    }
    next();
});


app.use(function(req, res, next) {
    console.log(req.session)
    next();
});


// Mount routes

app.use('/', collectedController);
app.use('/', usersController);


// Listen


app.listen(PORT, function () {
    console.log(`Express is listening on port: ${PORT}`);
})