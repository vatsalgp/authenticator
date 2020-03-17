const passport = require("passport");
const authentication = require("./authentication");
require("./passport"); //Needed to connect Strategies to this file

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });

module.exports = app => {
    app.get("/", (req, res) => { res.send("Hello World") });
    app.get("/data", requireAuth, (req, res) => { res.send({ data: "Protected Data" }) });
    app.post("/signup", authentication.signup);
    app.post("/signin", requireSignIn, authentication.signin);
}