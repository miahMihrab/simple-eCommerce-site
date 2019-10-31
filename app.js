const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const cookieparser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);
const PORT = process.env.PORT || 5000;
const mongoose = require("./mongoose/mongoose");
//require('./mongoose/mongoose');
require("./seed/product-seeder");

// mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }, (error, client) => {
//     if (error) throw new Error(error);
//     console.log("DB Connected Successfully!");

// })

//cookie parser
app.use(cookieparser());

//Session
app.use(
    session({
        secret: "mysecret",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        }),
        cookie: {
            maxAge: 180 * 60 * 1000
        }
    })
);

//flash
app.use(flash());

//Static folder
app.use(express.static("public"));

//express body parser
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);

//express handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

//isAuthenticated
app.use(function (req, res, next) {
    if (req.session.user) {
        res.locals.signin = true;
        res.locals.session = req.session;
        //console.log(req.session.user)
    }
    next();
});

//routes
app.use("/user", require("./routes/userRoutes"));
app.use("/", require("./routes/index"));

app.listen(PORT, () => console.log(`Server Up and Running at port: ${PORT}`));