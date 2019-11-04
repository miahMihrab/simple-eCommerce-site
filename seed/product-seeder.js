const Product = require('../models/products');
const mongoose = require('mongoose')
const products = [
    new Product({
        imagePath: "/pubg.jpg",
        item: "Player Unknown Battleground",
        description: "Awsome shooting game",
        price: 12
    }),
    new Product({
        imagePath: "/battlefield1.jpg",
        item: "Battlefield I",
        description: "Awsome FPP shooting game",
        price: 12
    }),
    new Product({
        imagePath: "/callofduty.jpg",
        item: "Call of duty",
        description: "Best shooting game",
        price: 12
    }),
    new Product({
        imagePath: "/doom.jpg",
        item: "Doom",
        description: "Awsome game",
        price: 12
    }),
    new Product({
        imagePath: "/ghostrecon.jpg",
        item: "Ghost Recon",
        description: "Awsome shooting game",
        price: 12
    }),
    new Product({
        imagePath: "/underlords.jpg",
        item: "Underlords",
        description: "Everyone should play this one",
        price: 12
    })
]
let done = 0;
for (let i = 0; i < products.length; i++) {
    // products[i].save((err, result) => {
    //     done++;
    //     if (done === products.length) {
    //         exit();
    //     }
    // });
}

function exit() {
    console.log('updated')
    mongoose.disconnect();
}