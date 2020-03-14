import axios from "../apis/axios";

export const signup = (form, callback) => async dispatch => {
    try {
        const response = await axios.post("/signup", form);
        const { token } = response.data;

        dispatch({
            type: "AUTH_USER",
            payload: token
        });

        window.localStorage.setItem("token", token)
        callback();
    } catch (e) {
        dispatch({
            type: "AUTH_ERROR",
            payload: "Email in use"
        });
    }
};

export const signin = (form, callback) => async dispatch => {
    try {
        const response = await axios.post("/signin", form);
        const { token } = response.data;

        dispatch({
            type: "AUTH_USER",
            payload: token
        });

        window.localStorage.setItem("token", token)
        callback();

    } catch (e) {
        dispatch({
            type: "AUTH_ERROR",
            payload: "Invalid Login Credentials"
        });
    }
};

export const signout = () => {
    window.localStorage.removeItem("token");

    return {
        type: "AUTH_USER",
        payload: ""
    };
};

