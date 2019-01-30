const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Books = require("../models/Books");

router.route("/add-to-cart/:uid").get((req, res) => {
    let bookId = req.params.uid;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    Books.find({ uid: bookId }, (err, book) => {
        if (err) {
            return res.redirect("/");
        } else {
            let item = book[0];
            cart.add(item, item.uid);
            req.session.cart = cart;
            res.json(req.session.cart.totalQty);
        }
    });
});

router.route("/getCart").get((req, res) => {
    res.json(req.session.cart);
});

module.exports = router;
