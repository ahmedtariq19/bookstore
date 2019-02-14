const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

router.route("/signup").post((req, res, next) => {
    passport.authenticate("local.signup", (err, user, info) => {
        if (err) {
            console.log("Error:", err);
            next(err);
        } else if (info) {
            res.json({ error: "Username already in use" });
        } else {
            req.session.loggedIn = true;
            req.session.currentUser = user;
            res.json(user);
        }
    })(req, res, next);
});

router.route("/login").post((req, res) => {
    let username,
        password = req.body;
    User.findOne({ email: username }, (err, user) => {
        if (err) {
            console.log(err);
            return;
        } else if (user) {
            if (User().encryptPassword(password) === user.password) {
                req.session.currentUser = user;
                res.json(user);
            } else {
                res.json({ error: "Wrong Password" });
            }
        } else {
            res.json({ error: "Email has not been signed up yet." });
        }
    });
});

router.route("/checkLoggedIn").get((req, res) => {
    if (req.session.loggedIn) {
        res.json(true);
    } else {
        res.json(false);
    }
});

router.route("/getUser").get((req, res) => {
    console.log(req.session.currentUser);
    res.json(req.session.currentUser);
});

module.exports = router;
