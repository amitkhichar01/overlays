const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Product = require("../models/products.js");

router.get(
    "/all-products",
    wrapAsync(async (req, res) => {
        const products = await Product.find();
        res.render("all-products.ejs", { products });
    })
);

router.get(
    "/woman",
    wrapAsync(async (req, res) => {
        const allProducts = await Product.find();
        let products = allProducts.filter((item) => item.gender === "female");
        res.render("all-products.ejs", { products });
    })
);

router.get(
    "/man",
    wrapAsync(async (req, res) => {
        const allProducts = await Product.find();
        let products = allProducts.filter((item) => item.gender === "male");
        res.render("all-products.ejs", { products });
    })
);

router.get(
    "/man/jacket",
    wrapAsync(async (req, res) => {
        const allProducts = await Product.find();
        let products = allProducts.filter((item) => item.productType === "jacket");
        res.render("all-products.ejs", { products });
    })
);

router.get(
    "/man/polo-Tshirt",
    wrapAsync(async (req, res) => {
        const allProducts = await Product.find();
        let poloTshirt = allProducts.filter((item) => item.productType === "polo tshirt");
        let shirt = allProducts.filter((item) => item.productType === "shirt");
        let products = poloTshirt.concat(shirt);
        res.render("all-products.ejs", { products });
    })
);
//     // if (!req.isAuthenticated()) {
//     //     req.flash("error", "please login first then come");
//     //     return res.redirect("/account/login");
//     // }
//     res.send("welcome to our clothing website");
// });

router.get(
    "/show/:id",
    wrapAsync(async (req, res) => {
        let productId = req.params.id;
        let product = await Product.findById(productId);
        let productType = product.productType;

        const allProducts = await Product.find();

        const similarProducts = allProducts.filter(
            (item) => item.productType === productType && item.id !== productId
        );

        similarProducts.sort((a, b) => a.productType.localeCompare(b.productType));

        const closestProducts = similarProducts.slice(0, 4).map((obj) => ({
            id: obj.id,
            title: obj.title,
            price: obj.price,
            imageUrl: obj.images[0],
            productType: obj.productType,
        }));

        res.render("product-info.ejs", { product, closestProducts });
    })
);

module.exports = router;
