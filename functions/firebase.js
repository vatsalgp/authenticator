const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const users = db.collection("auth");

//Read Data
exports.getByEmail = async email => {
    let output = {};
    const snapshot = await users.where("email", "==", email).get();
    snapshot.forEach(doc => output = { ...doc.data(), id: doc.id });
    return output;
};

exports.getById = async id => {
    const doc = await users.doc(id).get();
    return { id, ...doc.data() };
};

//Write Data
exports.write = async ({ email, password }) => {
    const ref = await users.add({ "email": email, "password": password });
    return ref.id;
};
