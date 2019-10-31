const Product = require('../models/products');
const mongoose = require('mongoose')
const products = [
    new Product({
        imagePath: "/pubg.jpg",
        title: "Player Unknown Battleground",
        description: "Awsome shooting game",
        price: 12
    }),
    new Product({
        imagePath: "/battlefield1.jpg",
        title: "Battlefield I",
        description: "Awsome FPP shooting game",
        price: 12
    }),
    new Product({
        imagePath: "/callofduty.jpg",
        title: "Call of duty",
        description: "Best shooting game",
        price: 12
    }),
    new Product({
        imagePath: "/doom.jpg",
        title: "Doom",
        description: "Awsome game",
        price: 12
    }),
    new Product({
        imagePath: "/ghostrecon.jpg",
        title: "Ghost Recon",
        description: "Awsome shooting game",
        price: 12
    }),
    new Product({
        imagePath: "/underlords.jpg",
        title: "Underlords",
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