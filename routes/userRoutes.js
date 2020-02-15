const db = require("../models");
const passport = require("../passport");

// ===============================================================================
// USER ROUTING
// ===============================================================================

module.exports = function(app) {

    // ===========================================================================
    // GET
    // ===========================================================================

    app.get("/api/user",
        function(req, res) {
            console.log("Logged in", req.user);
            var userInfo = {
                username: req.user.username
            };
            db.User
                .findOne(userInfo)
                .populate("inventory")
                .then(dbUser => {
                    const userResponse = {
                        playername: dbUser.playername,
                        username: dbUser.username,
                        charactername: dbUser.charactername,
                        email: dbUser.email,
                        role: dbUser.role,
                        inventory: dbUser.inventory
                    };
                    res.json(userResponse);
                })
                .catch(err => res.status(422).json(err));
        });

    // ===========================================================================
    // POST
    // ===========================================================================

    // Create a new user.
    app.post("/api/register", function(req, res) {
        db.User.findOne({ username: req.body.username }, (err, user) => {
            if (err) {
                console.log("User.js post error: ", err);
            } else if (user) {
                res.json({
                    error: `Sorry, already a user with the username: ${username}`
                });
            }
            else {
                console.log("Duplicate user not found. Proceed with create.");
                const newUser = {
                    playername: req.body.playername,
                    username: req.body.username,
                    password: req.body.password,
                    charactername: req.body.charactername,
                    email: req.body.email,
                    role: req.body.role,
                    inventory: []
                };
                db.User
                    .create(newUser)
                    .then(dbUser => res.json(dbUser))
                    .catch(err => res.status(422).json(err));
            }
        });
    });

    // Log in a user.
    app.post(
        "/api/login",
        function(req, res, next) {
            console.log("routes/userRoutes.js, login, req.body: ");
            console.log(req.body);
            next();
        },
        passport.authenticate("local"),
        (req, res) => {
            console.log("Logged in", req.user);
            var userInfo = {
                username: req.user.username
            };
            db.User
                .findOne(userInfo)
                .populate("inventory")
                .then(dbUser => {
                    const userResponse = {
                        playername: dbUser.playername,
                        username: dbUser.username,
                        charactername: dbUser.charactername,
                        email: dbUser.email,
                        role: dbUser.role,
                        inventory: dbUser.inventory
                    };
                    res.json(userResponse);
                })
                .catch(err => res.status(422).json(err));
        });

    // Log out a user.
    app.post("/api/logout", (req, res) => {
        if (req.user) {
            req.logout();
            res.json({ message: "Logging out" });
        } else {
            res.json({ message: "No user to log out" });
        }
    });
};