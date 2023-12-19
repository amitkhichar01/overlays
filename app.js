if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const ExpressError = require("./utils/ExpressError.js");
const pages = require("./router/pages.js");
const account = require("./router/account.js");
const collections = require("./router/collections.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.js");
const Product = require("./models/products.js");

const { localsMiddleware } = require("./middleware.js");
const wrapAsync = require("./utils/wrapAsync.js");
const dbUrl = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(dbUrl);
}
main()
    .then((response) => {
        console.log("Mongodb connection established");
    })
    .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(cookieParser("signedCookie"));

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(localsMiddleware);

app.get(
    "/",
    wrapAsync(async (req, res) => {
        const jacketProducts = await Product.find({ productType: "jacket" });
        res.render("home.ejs", { jacketProducts });
    })
);

//routes
app.use("/pages", pages);
app.use("/account", account);
app.use("/collections", collections);

app.all("*", (req, res, next) => {
    res.render("404.ejs");
});

//error-handling middleware
app.use((error, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = error;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("server listening on");
});
