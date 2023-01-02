import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import NavBar from './NavBar';
import OnboardingPage from './OnboardingPage';
// import SearchPage from './SearchPage';
import EditJoinContentPage from './EditJoinContentPage';
import EditContentPage from './EditContentPage';
import ProfilePage from './ProfilePage';
import EditUserPage from './EditUserPage';
import LogoutComponent from './LogoutComponent';
import HomePage from './HomePage';
import ErrorPage from './ErrorPage';

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
			<Route path="/edit/:contentId">
				<EditContentPage contentMethod="update" />
			</Route>
			{/* below integrated into home page? */}
			{/* <Route path="/search">	
				<SearchPage />
			</Route> */}
			<Route path="/user/:userHandle/:contentId/edit">
				<EditJoinContentPage />
			</Route>
			<Route path="/user/:userHandle">
				<ProfilePage />
			</Route>
			<Route path="/account">
				<EditUserPage />
			</Route>
			<Route path="/logout">
				<LogoutComponent />
			</Route>
			<Route path="/error/:errorCode">
				<ErrorPage />
			</Route>
			<Route path="/">
				<HomePage />
			</Route>
		</Switch>
	</UserDetailsContext.Provider>
	);

}

export default App;