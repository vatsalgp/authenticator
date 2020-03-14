const passport = require("passport");
const passportJwt = require("passport-jwt");
const passportLocal = require("passport-local");
const bcrypt = require("bcrypt-nodejs");
const auth = require("./auth-firebase");
const firebase = require("./firebase");
const config = require("./config");

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

//Create Local Strategy
const LocalLogin = new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    const hashedPassword = await auth.readCred(email);
    if (hashedPassword) {
        bcrypt.compare(password, hashedPassword, async function (err, isMatch) {
            if (err)
                return done(err);
            else if (!isMatch)
                return done(null, false);
            else {
                const id = await firebase.getId(email);
                return done(null, id);
            }
        });
    }
    else {
        return done(null, false);
    }
});

//Setup options for Strategy
const JwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
};

//Create Strategy
const JwtLogin = new JwtStrategy(JwtOptions, async (payload, done) => {
    const id = payload.sub;
    // console.log("id: ", id);
    const user = await firebase.getUser(id);
    // console.log("user: ", user);
    if (user && user.email)
        return done(null, user);
    else
        return done(null, false);
});

//Use Strategy
passport.use(LocalLogin);
passport.use(JwtLogin);