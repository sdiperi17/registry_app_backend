const passport = require("passport");
let frontendUrl = "https://registry-app.netlify.com"
const url = require('url');
module.exports = app => {
    // when user clicks login, the user is redirected to below route to allow user sign in with gmail account
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"]
        })
    );

    // after the user authenticated with Google, google strategy is run and
    // passport attaches user credentials to req.user object
    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {
            // console.log("look what the deseralize user function did@");
            console.log('USER HERE', req.user);
            res.redirect("/dashboard");
        }
    );

    // this route is to check if there is user session
    app.get("/auth/current_user", (req, res) => {
        console.log('FETCH USER NOW HERE', req.user);
        res.json(req.user);
    });

    app.get("/auth/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
};
