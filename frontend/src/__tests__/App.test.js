import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import NavBar from './NavBar';
import OnboardingPage from './OnboardingPage';

function App(){

	return(
	<React.Fragment>
		<NavBar />
		<Switch>
			<Route path="/login">
				<OnboardingPage method="login" />
			</Route>
			<Route path="/signup">
				<OnboardingPage method="signup" />
			</Route>
			<Route path="/upload">
				<UploadPage />
			</Route>
			<Route path="/search">
				<SearchPage />
			</Route>
			<Route path="/content">
				<ContentPage />
			</Route>
			<Route path="/user">
				<ProfilePage />
			</Route>
			<Route path="/logout">
				<LogoutComponent />
			</Route>
			<Route path="/">
				<HomePage />
			</Route>
			<Route path="/" >
				<NotFoundPage />
			</Route>
		</Switch>
	</React.Fragment>
	);


}

export default App;