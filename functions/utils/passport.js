const passport = require("passport");
const passportJwt = require("passport-jwt");
const passportLocal = require("passport-local");
const bcrypt = require("bcrypt");
const auth = require("./auth-firebase");
const firebase = require("./firebase");
const secretKey = require("./secretKey");

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

//Create Local Strategy for Signin
const LocalSignIn = new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
	const hashedPassword = await auth.readCred(email);
	if (hashedPassword) {
		bcrypt.compare(password, hashedPassword, async (err, isMatch) => {
			if (err) return done(err);
			else if (!isMatch) return done(null, false);
			else {
				const user = await firebase.getByEmail(email);
				const id = user.id;
				return done(null, id);
			}
		});
	} else {
		return done(null, false);
	}
});

//Create Local Strategy for Signup
const LocalSignUp = new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
	if (!(email && password)) return done("You must provide email and password");

	// If a user with given email exists return error
	if (await auth.readCred(email)) return done("Email is in use");

	//If email does not exist, create and save user record
	const id = await auth.writeCred({ email, password });
	return done(null, id);
});

//Setup options for Strategy
const JwtOptions = {
	jwtFromRequest : ExtractJwt.fromHeader("authorization"),
	secretOrKey    : secretKey
};

//Create Strategy
const JwtLogin = new JwtStrategy(JwtOptions, async (payload, done) => {
	const id = payload.sub;
	const user = await firebase.getById(id);
	if (user && user.email) return done(null, user);
	else return done(null, false);
});

//Use Strategy
passport.use("local-signin", LocalSignIn);
passport.use("local-signup", LocalSignUp);
passport.use(JwtLogin);
