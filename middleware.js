const ExpressError = require("./utils/ExpressError.js");
const User = require("./models/users.js");
const { userSchemaJoi } = require("./Schema.js");
const wrapAsync = require("./utils/wrapAsync.js");

const validateUser = wrapAsync((req, res, next) => {
    const { error } = userSchemaJoi.validate(req.body);

    if (error) {
        const errorMessage = error.details.map((err) => err.message).join(", ");

        const errorType = error.details && error.details[0] && error.details[0].type;

        return next(
            new ExpressError(
                400,
                errorType === "string.email" ? "Please enter a valid email address" : errorMessage
            )
        );
    }

    next();
});

const checkEmailUnique = wrapAsync(async (req, res, next) => {
    const { email } = req.body.user;
    const isEmailUnique = await User.findOne({ email });

    if (isEmailUnique) return next(new ExpressError(400, "Email is already registered"));

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
