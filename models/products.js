const mongoose = require('mongoose');

const Productmodel = mongoose.Schema({
    imagePath: {
        type: String,
        requried: true
    },
    item: {
        type: String,
        requried: true
    },
    description: {
        type: String,
        requried: true
    },
    price: {
        type: Number,
        requried: true
    }
})

const product = mongoose.model('product', Productmodel);

module.exports = product;