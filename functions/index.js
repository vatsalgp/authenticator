//Starting point of server
const functions = require('firebase-functions');
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");
const app = express();

//Cors Setup

const whitelist = [
    "https://authenticator-5a724.web.app",
    "https://authenticator-5a724.firebaseapp.com",
    "https://auth-28.netlify.com/"
]; // No ending Slash

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

//App Setup

app.use(morgan("combined")); // For logging requests
app.use(cors(corsOptions));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//Server Setup

const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);
exports.app = functions.https.onRequest(app);
