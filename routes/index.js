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

router.get('/user/signup', (req, res, next) => {

    const message = req.flash('message');
    console.log(message);
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        message
    });
})
router.post('/user/signup', async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    if (password.length < 6) {
        req.flash('message', 'Minimum password length must be of length 6')
        return res.redirect('/user/signup')
    }
    const user = await new User({
        email,
        password
    })
    try {
        await user.save();
        res.redirect('/user/profile')
        console.log(`${user.email} registered`)
    } catch (error) {
        console.log(error)
        if ((error.errmsg).includes('duplicate key'))
            req.flash('message', "Email already exist")
        res.redirect('/user/signup');
    }

})

router.get('/user/profile', (req, res, next) => {
    res.render('user/profile');
})
module.exports = router;