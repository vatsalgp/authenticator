import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Welcome from "./Welcome";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Signout from "./auth/Signout";
import Feature from "../components/Feature";

const App = () => {
	return (
		<div className="ui container">
			<BrowserRouter>
				<Header />
				<Route path="/" exact component={Welcome} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/signin" exact component={Signin} />
				<Route path="/signout" exact component={Signout} />
				<Route path="/feature" exact component={Feature} />
			</BrowserRouter>
		</div>
	);
}

export default App;
