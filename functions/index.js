//Starting point of server
const functions = require("firebase-functions");
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const router = require("./utils/router");
const app = express();

//Cors Setup

const whitelist = [
	"https://authenticator-5a724.web.app",
	"https://authenticator-5a724.firebaseapp.com",
	"https://auth.vatsalgp.com"
]; // No ending Slash

const corsOptions = {
	origin : (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1) callback(null, true);
		else callback(new Error("Not allowed by CORS"));
	}
};

//App Setup

app.use(morgan("combined")); // For logging requests
app.use(cors(corsOptions));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//Server Setup

app.listen(process.env.PORT || 4000);
exports.app = functions.https.onRequest(app);
