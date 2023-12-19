const ExpressError = require("./utils/ExpressError.js");
const User = require("./models/users.js");
const { userSchemaJoi } = require("./Schema.js");
const wrapAsync = require("./utils/wrapAsync.js");

const validateUser = (req, res, next) => {
    const { error } = userSchemaJoi.validate(req.body);

    if (error) {
        const errorMessage = error.details.map((err) => err.message).join(", ");

        const errorType = error.details && error.details[0] && error.details[0].type;

        req.flash("error", errorMessage);
        return res.redirect("/account/register");
    } else {
        next();
    }
};

const checkEmailUnique = wrapAsync(async (req, res, next) => {
    const { email } = req.body.user;
    const isEmailUnique = await User.findOne({ email: email });

    if (isEmailUnique) {
        req.flash("error", "Email is already registered");
        return res.redirect("/account/register");
    }

    next();
});

const localsMiddleware = (req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.user = req.user;
    next();
};

module.exports = {
    validateUser,
    checkEmailUnique,
    localsMiddleware,
};
