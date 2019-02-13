const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");
const booksRoute = require("./controllers/books-controller");
const cartRoute = require("./controllers/cart-controller.js");
const userRoute = require("./controllers/user-controller.js");
const passport = require("passport");
const API_PORT = 3001;
const app = express();
const router = express.Router();
require("./config/passport");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true // enable set cookie
    })
);

app.use(express.static(__dirname + "/../frontend/public"));

mongoose.connect(
    "mongodb://localhost:27017/shopping-cart",
    {
        useNewUrlParser: true
    }
);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
app.use(cookieParser());
app.use(
    session({
        secret: "mySuperSecret",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: db }),
        cookie: { maxAge: 180 * 60 * 1000, secure: false }
    })
);

router.route("/getCartQty").get((req, res, next) => {
    res.json(req.session.cart ? req.session.cart.totalQty : "");
    next();
});

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);
app.use("/cart", cartRoute);
app.use("/books", booksRoute);
app.use("/user", userRoute);

app.listen(API_PORT, () =>
    console.log(`Shopping-cart's backend is listening on port ${API_PORT}`)
);
