const express = require("express");
const router = express.Router();

router.get("/faqs", (req, res) => {
    res.render("faqs.ejs");
});

router.get("/about-us", (req, res) => {
    res.render("about.ejs");
});

router.get("/contact-us", (req, res) => {
    res.render("contact.ejs");
});

router.get("/return_prime", (req, res) => {
    res.render("return.ejs");
});

router.get("/shipping-policy", (req, res) => {
    res.render("shipping.ejs");
});

router.get("/refund-return-exchange-cancellation", (req, res) => {
    res.render("refund.ejs");
});

router.get("/terms-condition", (req, res) => {
    res.render("terms.ejs");
});

router.get("/privacy-policy", (req, res) => {
    res.render("privacy.ejs");
});

router.get("/fraud-protection", (req, res) => {
    res.render("fraud.ejs");
});

module.exports = router;
