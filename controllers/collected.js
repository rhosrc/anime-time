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

// Nested Resource Routes

collectedRouter.post('/profile/:id/reviews', async function (req, res){
    // find the title we need to make a review for
    const title = await Title.findById(req.params.id);
    // insert req.body(our review) into the review array for the found title
    title.reviews.push(req.body);
    // save the current state of the title
    await title.save();
    // redirect back to the client
    res.redirect(`/profile/${title._id}`);
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

collectedRouter.put('/profile/:id', function (req, res) {
    Title.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true,
        },
        function (error, updatedTitle) {
            res.redirect(`/profile/${req.params.id}`)
        })
        
})


collectedRouter.get('/profile/:id/edit', function (req, res) {
    Title.findById(req.params.id, function (error, foundTitle) {
        res.render('edit.ejs', {
            title: foundTitle
        })
    })
})

collectedRouter.get('/profile/:id', function (req, res) {
    Title.findById(req.params.id, function (error, foundTitle) {
        res.render('show.ejs', {
            title: foundTitle
        })
    })
})




collectedRouter.get('/search/:id', function (req, res) {
    foundTitle = animeInfo.find(e => {
        return e.title === req.params.id;
    })
    res.render('info.ejs', {
        title: foundTitle
    });
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