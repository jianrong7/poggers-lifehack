import React from 'react'
import Home from './components/Home'
import Menu from './components/Menu';
import Login from './components/Login';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

const App = () => {
	return (
		<Router>
			<Menu />
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	)
}
export default App;
