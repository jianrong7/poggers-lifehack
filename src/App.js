import React from 'react'
import Home from './components/Home'
import Menu from './components/Menu';
import Login from './components/Login';
import Signup from './components/Signup';
import Leaderboard from './components/Leaderboard';
import Courses from './components/Courses';
import Questions from './components/Questions';
import {
	BrowserRouter as Router,
	Switch,
	Route
  } from "react-router-dom";
  import { Container } from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Menu />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/signup">
						<Container 
							className="d-flex align-items-center justify-content-center"
							style={{ minHeight: "100vh" }}>
								<div className="w-100" style={{ maxWidth: "400px"}}>
									<Signup />
								</div>
						</Container>
					</Route>
					<Route path="/leaderboard">
						<Leaderboard />
					</Route>
					<Route path="/courses">
						<Courses />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/questions">
						<Questions />
					</Route>
				</Switch>
			</Router>
		</AuthProvider>
	)
}
export default App;
