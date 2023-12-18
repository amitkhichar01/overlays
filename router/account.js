const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { validateUser, checkEmailUnique } = require("../middleware.js");
const User = require("../models/users.js");
const passport = require("passport");

router.get("/register", (req, res) => {
    res.render("register.ejs");
});

router.post(
    "/register",
    validateUser,
    checkEmailUnique,
    wrapAsync(async (req, res, next) => {
        let { username, email, password } = req.body.user;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.flash("success", "New user added");
        res.redirect("/overlay");
    })
);

router.get("/login", (req, res) => {
    res.render("login.ejs");
});

router.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/account/login", failureFlash: true }),
    wrapAsync(async (req, res, next) => {
        res.redirect("/overlay");
    })
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logout");
        res.redirect("/overlay");
    });
});

module.exports = router;
