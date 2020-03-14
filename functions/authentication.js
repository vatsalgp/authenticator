const jwt = require("jwt-simple");
const config = require("./config");
const auth = require("./auth-firebase");

function tokenForUser(id) {
    const timeStamp = new Date().getTime();
    return jwt.encode({ sub: id, iat: timeStamp }, config.secret);
}

exports.signin = function (req, res) {
    console.log(req.user);
    res.send({ token: tokenForUser(req.user) });
}

exports.signup = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!(email && password)) {
        return res.status(422).send({ error: "You must provide email and password" });
    }

    const existingUser = await auth.readCred(email);
    // See if a user with given email exists
    if (existingUser) {
        //If email exists, return error
        //Unprocessable Entity
        return res.status(422).send({ error: "Email is in use" });
    }

    //If email does not exist, create and save user record
    await auth.writeCred({ email, password }, id => {
        console.log("ID: ", id)
        //Respond with token
        if (id)
            res.json({ token: tokenForUser(id) });
        else
            res.json({ error: "Unable to add user" });
    });
}