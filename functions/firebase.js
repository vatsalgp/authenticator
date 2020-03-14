const admin = require('firebase-admin');

const serviceAccount = require('./firebase-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const users = db.collection("auth");

//Read Data
exports.read = async (email) => {
    let output = {};
    await users.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.email == email)
                output = data;
        });
    }).catch((err) => {
        console.log('Error getting documents', err);
    });
    return output;
};

exports.getId = async (email) => {
    let output = "";
    await users.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.email == email)
                output = doc.id;
        });
    }).catch((err) => {
        console.log('Error getting documents', err);
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
    }).catch((err) => {
        console.log('Error getting documents', err);
    });
    return output;
};

//Write Data
exports.write = async ({ email, password }) => {
    const ref = await users.add({ "email": email, "password": password });
    return ref.id;
};
