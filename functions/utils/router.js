const jwt = require("jwt-simple");
const passport = require("passport");
const secretKey = require("./secretKey");
require("./passport"); //Needed to connect Strategies to this file

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local-signin", { session: false });
const requireSignUp = passport.authenticate("local-signup", { session: false });

const sign = (req, res) => {
	const tokenOptions = {
		sub : req.user, //ID
		iat : new Date().getTime()
	};
	const token = jwt.encode(tokenOptions, secretKey);
	res.send({ token });
};

module.exports = app => {
	app.get("/", (req, res) => {
		res.send("Hello World");
	});
	app.get("/data", requireAuth, (req, res) => {
		res.send({ data: "Protected Data" });
	});
	app.post("/signup", requireSignUp, sign);
	app.post("/signin", requireSignIn, sign);
};
