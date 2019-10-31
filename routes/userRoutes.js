const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Products = require('../models/products');
const csrf = require('csurf')
const User = require('../models/user')
const csrfProtection = csrf();
router.use(csrfProtection)



router.get('/', (req, res) => {
    Products.find(async (err, products) => {
        let productsArray = [];
        for (let i = 0; i < products.length; i += 3) {
            productsArray.push(products.slice(i, i + 3));
        }
        return await res.render('index', {
            title: "E-commerce | Home",
            products: productsArray
        });
    })

})


//Sign Up
router.get('/signup', (req, res, next) => {

    const message = req.flash('message');
    if (req.session.user) {
        req.session.destroy();
        res.redirect('signup');
    } else res.render('user/signup', {
        csrfToken: req.csrfToken(),
        message
    });
})
router.post('/signup', async (req, res, next) => {


    const {
        email,
        password
    } = req.body;
    if (password.length < 6) {
        req.flash('message', 'Minimu, password length must be of length 6')
        return res.redirect('signup')
    }
    const user = await new User({
        email,
        password
    })
    try {
        await user.save();
        res.redirect('profile')
        console.log(`${user.email} registered`)
    } catch (error) {
        console.log(error)
        if ((error.errmsg).includes('duplicate key'))
            req.flash('message', "Email already exist")
        res.redirect('signup');
    }

})



//Sign In
router.get('/signin', (req, res) => {
    const message = req.flash('message');

    if (req.session.user) {
        req.session.destroy();
        res.redirect('signin');
    } else res.render('user/signin', {
        csrfToken: req.csrfToken(),
        message
    })
})

router.post('/signin', async (req, res) => {
    //console.log("post")
    const {
        email,
        password
    } = req.body;
    const user = await User.findUserByCredentials(email, password);

    //console.log(user)
    if (user.error) {
        //console.log(user.error)
        req.flash("message", user.error);
        res.redirect('signin');
    } else {
        req.session.user = user;
        return res.redirect('/');
    }

})


router.get('/profile', isSignedIn, (req, res, next) => {
    res.render('user/profile');
})
module.exports = router;

function isSignedIn(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/');

}