import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import NavBar from './NavBar';
import OnboardingPage from './OnboardingPage';
import SearchPage from './SearchPage';
import EditContentPage from './EditContentPage';
import ProfilePage from './ProfilePage';
import LogoutComponent from './LogoutComponent';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';

import UserDetailsContext from './context/UserDetailsContext';

function App(){
	
	// Session Username Cookie
	const [sessionUsername, setSessionUsername] = useState(localStorage.getItem('sessionUsername') || undefined);
	
	// ...

	return(
	<UserDetailsContext.Provider value={{sessionUsername, setSessionUsername}}>
		<NavBar />
		<Switch>
			<Route path="/login">
				<OnboardingPage onboardingMethod="login" />
			</Route>
			<Route path="/signup">
				<OnboardingPage onboardingMethod="signup" />
			</Route>
			<Route path="/upload">
				<EditContentPage contentMethod="create" />
			</Route>
			<Route path="/edit/:contentID">
				<EditContentPage contentMethod="update" />
			</Route>
			{/* integrate below into home page? */}
			<Route path="/search">	
				<SearchPage />
			</Route>
			<Route path="/profile">
				<ProfilePage />
			</Route>
			<Route path="/logout">
				<LogoutComponent />
			</Route>
			<Route path="/">
				<HomePage />
			</Route>
			{/* <Route path="/" >
				<NotFoundPage />
			</Route> */}
		</Switch>
	</UserDetailsContext.Provider>
	);

}

export default App;