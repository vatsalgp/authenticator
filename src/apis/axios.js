import axios from "axios";

export default axios.create({
	baseURL :
		process.env.NODE_ENV === "production"
			? "https://us-central1-authenticator-5a724.cloudfunctions.net/app"
			: "http://localhost:5001"
});
