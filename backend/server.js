const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const logger = require("morgan")
const cors = require("cors")

const API_PORT = 3001
const app = express()
const router = express.Router()
const booksRoute = require('./controllers/books-controller');

mongoose.connect('mongodb://localhost:27017/shopping-cart', {useNewUrlParser: true})

var db = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.use(express.static("static_files"));

router.get('/', (req, res) => {
    res.send('Hey')
})

app.use("/", router)
app.use("/books", booksRoute)

app.listen(API_PORT, () => console.log(`Shopping-cart's backend is listening on port ${API_PORT}`))