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
            res.json(req.session.cart);
        }
    });
});

router.route("/getCart").get((req, res) => {
    res.json(req.session.cart);
});

router.route("/minusOne/:uid").get((req, res) => {
    let bookId = req.params.uid;
    let cart = new Cart(req.session.cart);
    Books.find({ uid: bookId }, (err, book) => {
        if (err) {
            return res.redirect("/");
        } else {
            let item = book[0];
            cart.minusOne(item, item.uid);
            req.session.cart = cart;
            res.json(req.session.cart);
        }
    });
});

router.route("/removeItem/:uid").get((req, res) => {
    let bookId = req.params.uid;
    let cart = new Cart(req.session.cart);
    Books.find({ uid: bookId }, (err, book) => {
        if (err) {
            return res.redirect("/");
        } else {
            let item = book[0];
            cart.remove(item, item.uid);
            req.session.cart = cart;
            res.json(req.session.cart);
        }
    });
});
module.exports = router;
