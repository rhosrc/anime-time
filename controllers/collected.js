// Require dependencies

const express = require('express');
const collectedRouter = express.Router();
const axios = require ('axios');

// Create a router object

const Title = require('../models/titles');

const BASE_URL = 'https://api.jikan.moe/v3/search/anime?q='

// List router actions

// SEED

// HOME (SEARCH TITLES)

// INDEX

collectedRouter.get('/', function (req, res, next){
    axios.get(BASE_URL + 'toradora')
.then(response => {
    // console.log(response.data.results);
    res.render('home.ejs', {results: response.data.results});
})
})




// collectedRouter.post('/', function (req, res){

// })

// NEW

// DELETE

// UPDATE

// CREATE

// EDIT

// SHOW

module.exports = collectedRouter;