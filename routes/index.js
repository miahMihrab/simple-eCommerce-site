const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Products = require('../models/products');
const csrf = require('csurf')
const User = require('../models/user')
const Cart = require('../models/cart');
const stripe = require('stripe')('STRIPE_SECRET_KEY');
const csrfProtection = csrf();
//router.use(csrfProtection)
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


router.get('/add-to-cart/:id', function (req, res, next) {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Products.findById(productId, function (err, product) {
        if (err) return res.redirect('/');
        cart.add(product, product.id);
        req.session.cart = cart;
        // console.log(req.session.cart)
        //console.log(product)

        res.redirect('/')

    })

})


router.get('/shopping-cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('shopping-cart', {
            products: null
        })
    }

    let cart = new Cart(req.session.cart)

    console.log(req.session.cart)
    const totalPrice = cart.totalPrice;
    console.log(totalPrice)
    res.render('shopping-cart', {
        products: cart.generateArray(),
        totalPrice
    })
})

router.get('/checkout', function (req, res, next) {
    //console.log(req.session.cart.totalPrice * 100)
    const totalPrice = req.session.cart.totalPrice * 100;
    console.log(totalPrice)
    res.render('checkout', {
        totalPrice
    })
})

router.post('/checkout', (req, res) => {
    const amount = req.session.cart.totalPrice * 100;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    }).then(customer => stripe.charges.create({
        amount,
        currency: 'usd',
        customer: customer.id
    })).then(charge => {
        console.log(charge);
        return res.redirect('/shopping-cart')
    });
})


router.get('/user/profile', (req, res, next) => {
    res.render('user/profile');
})



module.exports = router;
