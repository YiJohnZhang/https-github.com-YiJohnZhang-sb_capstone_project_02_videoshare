import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import NavBar from './NavBar';
import OnboardingPage from './PageComponents/OnboardingPage';
import ContentPage from './PageComponents/ContentPage';
import EditJoinContentPage from './PageComponents/EditJoinContentPage';
import EditContentPage from './PageComponents/EditContentPage';
import ProfilePage from './PageComponents/ProfilePage';
import EditUserPage from './PageComponents/EditUserPage';
import LogoutComponent from './LogoutComponent';
import HomePage from './PageComponents/HomePage';
import ErrorPage from './PageComponents/ErrorPage';

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
			<Route path="/content/:contentID">
				<ContentPage />
			</Route>
			<Route path="/upload">
				<EditContentPage contentMethod="create" />
			</Route>
			<Route path="/edit/:contentID">
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
			<Route path="/error">
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