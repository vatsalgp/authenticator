const bcrypt = require("bcrypt");
const firebase = require("./firebase");

exports.readCred = async email => {
    const user = await firebase.getByEmail(email);
    //User exists
    if (user && user.email === email)
        return user.password;
    //User doesn't exist
    else
        return "";
};

exports.writeCred = async ({ email, password }) => {
    const hash = await bcrypt.hash(password, 10);
    const id = await firebase.write({ email, password: hash });
    return id;
}