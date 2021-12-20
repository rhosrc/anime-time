const usersRouter = require('express').Router();
const User = require('../models/user')
const Title = require('../models/titles');


const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


usersRouter.get('/login', function (req, res) {
    res.render('login.ejs', {
        error: ''
    });
});

usersRouter.post('/login', function (req, res) {
    // step 1 - find the user in the database by their email/username
    User.findOne({
        email: req.body.email
    }, function (error, foundUser) {
        // step 1.1 - if the user is not found, respond with an error saying invalid credentials
        if (!foundUser) return res.render('login.ejs', {
                // foundUser: req.session.user, 
                error: 'invalid creds'
            });
        // step 2 - assuming we've found the user, now we compare passwords
        if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
            // step 2.1 - if there is not a match, respond with an error saying invalid credentials
            return res.render('login.ejs', {
                // foundUser: req.session.user, 
                error: 'invalid creds'
            });
        }
        // step 3 - assuming there is a match, we create a session and redirect to dashboard.
        req.session.user = foundUser._id;
        res.redirect('/profile');
    })
})

usersRouter.get('/signup', async function (req, res) {
    const user = await User.findById(req.session.user);
    res.render('signup.ejs', { user });
});

usersRouter.post ('/signup', async function (req, res) {
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS));
    req.body.password = hash;
    User.create(req.body, function (error, user) {
        req.session.user = user._id; // this is a login
        res.redirect('/profile'); // send the logged in user to a private space in the site.
    })
})

usersRouter.get('/logout', function (req, res) {
    req.session.destroy(function () {
        res.redirect('/');
    });
});

usersRouter.get('/profile', async function (req, res) {
    const titles = await Title.find({});
    if (!req.session.user) return res.redirect('/login');
    User.findById(req.session.user, function (error, user) {
        res.render('dashboard.ejs', {
            user, titles
        });
    });
    console.log(titles);
})

// collectedRouter.post('/profile/:id/reviews', async function (req, res){
//     // find the title we need to make a review for
//     const title = await Title.findById(req.params.id);
//     // insert req.body(our review) into the review array for the found title
//     title.reviews.push(req.body);
//     // save the current state of the title
//     await title.save();
//     // redirect back to the client
//     res.redirect(`/profile/${title._id}`);
// })

usersRouter.get('/profile', function (req, res) {
    if(!req.session.user) return res.redirect('/login');
    User.findById(req.session.user).populate('profile').exec(function (error, user){
        res.render('profile.ejs', {
            user,
        })
    })
})


// collectedRouter.delete('/profile/:id', function (req, res) {
//     Title.findByIdAndRemove(req.params.id, function (error, deletedTitle) {
//         res.redirect('/profile')
//     })
// })

// collectedRouter.put('/profile/:id', function (req, res) {
//     Title.findByIdAndUpdate(
//         req.params.id,
//         req.body, {
//             new: true,
//         },
//         function (error, updatedTitle) {
//             res.redirect(`/profile/${req.params.id}`)
//         })
        
// })


// collectedRouter.get('/profile/:id/edit', function (req, res) {
//     Title.findById(req.params.id, function (error, foundTitle) {
//         res.render('edit.ejs', {
//             title: foundTitle
//         })
//     })
// })

// collectedRouter.get('/profile/:id', function (req, res) {
//     Title.findById(req.params.id, function (error, foundTitle) {
//         res.render('show.ejs', {
//             title: foundTitle
//         })
//     })
// })

usersRouter.post('/profile', function (req, res) {
    if(!req.session.user) return res.redirect('/login');
    User.findById(req.session.user, function (error, user){
        res.render('profile.ejs', {
            user,
        
        })
    })
    Title.create(foundTitle, function (error, createdTitle) {
        res.redirect('/search')
    });
})


module.exports = usersRouter;