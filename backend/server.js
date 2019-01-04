const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const logger = require("morgan")

const API_PORT = 3001
const app = express()
const router = express.Router()

mongoose.connect('mongodb://localhost:27017/shopping-cart', {useNewUrlParser: true})

var db = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("connected", console.error.bind(console, "MongoDB connected:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.get('/', (req, res) => {
    res.send('Hello World')
})

app.use("/", router)


app.listen(API_PORT, () => console.log(`Shopping-cart's backend is listening on port ${API_PORT}`))
