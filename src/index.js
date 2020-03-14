import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux";

import App from './components/App';
import reducers from "./reducers";

const initialState = { auth: { authenticated: window.localStorage.getItem("token") } };
const store = createStore(reducers, initialState, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));