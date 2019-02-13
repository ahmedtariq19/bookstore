const express = require("express");
const router = express.Router();
const passport = require("passport");

router.route("/signup").post((req, res, next) => {
    passport.authenticate("local.signup", (err, user, info) => {
        console.log("err:", err);
        console.log("user:", user);
        console.log("info:", info);
        if (err) {
            console.log("Error:", err);
            next(err);
        } else if (info) {
            res.json({ error: "Username already in use" });
        } else {
            res.json(user);
        }
    })(req, res, next);
});

router.route("/checkLoggedIn").get((req, res) => {
    if (req.session.loggedIn) {
        res.json(true);
    } else {
        res.json(false);
    }
});

module.exports = router;
