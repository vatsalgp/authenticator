import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const AUTH_INITIAL_STATE = {
    authenticated: "",
    errorMessage: ""
}

const authReducer = (state = AUTH_INITIAL_STATE, action) => {
    switch (action.type) {
        case "AUTH_USER":
            return { ...state, authenticated: action.payload }
        case "AUTH_ERROR":
            return { ...state, errorMessage: action.payload }
        default:
            return state;
    }
};

export default combineReducers({
    auth: authReducer,
    form: formReducer
});