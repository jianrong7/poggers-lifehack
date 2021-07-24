import React, { useState, useEffect } from 'react'
import Home from './components/Home'
import Menu from './components/Menu';
import Login from './components/Login';
import Signup from './components/Signup';
import Questions from './components/Questions';
import Dashboard from './components/Dashboard';
import {
	BrowserRouter as Router,
	Switch,
	Route
  } from "react-router-dom";
import { Container } from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
	const [determineDifficulty, setDetermineDifficulty] = useState(null)
    const [selectedSubject, setSelectedSubject] = useState('')

	const questionChange = (type, value) => {
		if (type === 'difficulty') {
			setDetermineDifficulty(value)
		} else if (type === 'subject') {
			setSelectedSubject(value)
		}
	}
	useEffect(() => {
		console.log(selectedSubject)
	})
	return (
		<AuthProvider>
			<Router>
				<Menu />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/signup">
						<Container 
							className="d-flex align-items-center justify-content-center"
							style={{ minHeight: "80vh" }}>
								<div className="w-100" style={{ maxWidth: "400px"}}>
									<Signup />
								</div>
						</Container>
					</Route>
					<Route path="/login">
						<Container 
							className="d-flex align-items-center justify-content-center"
							style={{ minHeight: "80vh" }}>
								<div className="w-100" style={{ maxWidth: "400px"}}>
								<Login />
								</div>
						</Container>
					</Route>
					<Route path="/questions">
						<Questions determineDifficulty={determineDifficulty} selectedSubject={selectedSubject}/>
					</Route>
					<Route path="/dashboard">
						<Dashboard questionChange={questionChange}/>
					</Route>
				</Switch>
			</Router>
		</AuthProvider>
	)
}
export default App;
