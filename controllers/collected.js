// Require dependencies

const express = require('express');
const collectedRouter = express.Router();
const axios = require('axios');


// Create a router object

const Title = require('../models/titles');

const BASE_URL = 'https://api.jikan.moe/v3/search/anime?q='
let animeInfo;
let foundTitle;

// List router actions

// SEED

// HOME (SEARCH TITLES)

// INDEX
collectedRouter.get('/', function (req, res, next) {
    res.render('home.ejs');
})

collectedRouter.get('/search', function (req, res, next) {
    // console.log(req.query.search);
    axios.get(BASE_URL + req.query.search)
        .then(response => {
            animeInfo = response.data.results;
            res.render('results.ejs', {
                results: animeInfo
            });
        })

})

collectedRouter.get('/profile', function (req, res) {
    Title.find({}, function (error, allTitles) {
        res.render('profile.ejs', {
            titles: allTitles
        })
    })
})


collectedRouter.delete('/profile/:id', function (req, res) {
    Title.findByIdAndRemove(req.params.id, function (error, deletedTitle) {
        res.redirect('/profile')
    })
})

collectedRouter.get('/profile/:id', function (req, res){
    Title.findById(req.params.id, function (error, foundTitle){
        res.render('show.ejs', {
            title: foundTitle
        })
    })
})




collectedRouter.get('/:id', function (req, res) {
    foundTitle = animeInfo.find(e => {
        return e.title === req.params.id;
    })
    res.render('info.ejs', {
        title: foundTitle
    });
    // console.log(foundTitle);
    // res.render('show.ejs', {title: animeInfo}) 
})


collectedRouter.post('/profile', function (req, res) {
    Title.create(foundTitle, function (error, createdTitle) {
        res.redirect('/search')
    });
})



// NEW

// DELETE



// UPDATE

// CREATE

// EDIT

// SHOW

module.exports = collectedRouter;