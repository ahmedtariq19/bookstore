const express = require("express");
const router = express.Router();
const Books = require("../models/Books");

router.route("/all-books").get((req, res) => {
    Books.find((err, books) => {
        if (err) {
            throw err;
        } else {
            res.json(books);
        }
    });
});

router.route("/search/:query").get((req, res) => {
    console.log("query:", req.params);
    Books.find({ $text: { $search: req.params.query } }, (err, books) => {
        if (err) {
            throw err;
        } else {
            res.json(books);
        }
    });
});

router.route("/getRandom").get((req, res) => {
    Books.aggregate([{ $sample: { size: 4 } }], (err, books) => {
        if (err) {
            throw err;
        } else {
            res.json(books);
        }
    });
});

module.exports = router;
