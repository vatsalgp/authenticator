const bcrypt = require("bcrypt-nodejs");
const firebase = require("./firebase");

exports.readCred = async email => {
    const user = await firebase.read(email);
    //User exists
    if (user && user.email == email)
        return user.password;
    //User doesn't exist
    else
        return "";
};

exports.writeCred = async ({ email, password }, callback) => {
    //Generate Salt
    bcrypt.genSalt(10, async (err, salt) => {
        if (err) return err;

        //Hash password using salt, then run function
        bcrypt.hash(password, salt, null, async (err, hash) => {
            if (err) return err;

            //Overwrite password with hash
            password = hash;

            //Save the model
            const id = await firebase.write({ email, password });
            callback(id);
        });
    });
}