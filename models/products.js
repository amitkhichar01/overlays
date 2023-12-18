const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: [{ type: String, required: true }],
    images: [{ type: String, required: true }],
    information: [
        {
            type: String,
            required: true,
        },
    ],
    price: { type: Number, required: true },
    sizes: [{ type: String, required: true }],
    productType: { type: String, required: true },
    gender: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
