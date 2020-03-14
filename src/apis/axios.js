import axios from "axios";

export default axios.create({
    baseURL: "https://us-central1-authenticator-5a724.cloudfunctions.net/app"
});
