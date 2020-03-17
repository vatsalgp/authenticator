const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const users = db.collection("auth");

//Read Data
exports.read = async (email) => {
    let output = {};
    await users.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.email === email)
                output = data;
        });
    });
    return output;
};

exports.getId = async (email) => {
    let output = "";
    await users.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.email === email)
                output = doc.id;
        });
    });
    return output;
};

exports.getUser = async (id) => {
    let output = {};
    await users.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            if (doc.id === id)
                output = doc.data();
        });
    });
    return output;
};

//Write Data
exports.write = async ({ email, password }) => {
    const ref = await users.add({ "email": email, "password": password });
    return ref.id;
};
