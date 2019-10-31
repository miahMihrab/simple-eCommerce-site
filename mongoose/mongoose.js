const mongoose = require('mongoose');



mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (error, client) => {
    if (error) throw new Error(error);
    console.log("DB Connected Successfully!");

})

module.exports = mongoose;