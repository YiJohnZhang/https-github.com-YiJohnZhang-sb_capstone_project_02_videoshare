import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import useAuthenticationDependentRedirect from './hooks/useAuthenticationDependentRedirect';
import useControlledForm from './hooks/useControlledForm';
import useLocalStorage from './hooks/useLocalStorage';
import ShortCollabsAPI from './helpers/api';
// import useAPICall from './hooks/useAPICall';
import UserDetailsContext from './context/UserDetailsContext';


function OnboardingPage(){

	useAuthenticationDependentRedirect(false);

	const history = useHistory();
	const [jwt, setJWT] = useLocalStorage('jwt');
	const [localSessionUsername, setLocalSessionUsername] = useLocalStorage('sessionUsername');
	const {setSessionUsername} = useContext(UserDetailsContext);

	let INITIAL_FORM_STATE;
	if(onboardingMethod === 'login'){

		INITIAL_FORM_STATE = {
			username: '',
			password: ''
		}

	}else if(onboardingMethod === 'signup'){

		INITIAL_FORM_STATE = {
			username: '',
			password: '',
			email: '',
			firstName: '',
			lastName: '',
			//	...
		}

	}
	const [formState, setFormState] = useControlledForm(INITIAL_FORM_STATE);

	function formChangeHandler(evt){

		const {name, value} = evt.target
		setFormState(name, value);

	}

	async function clickHandler(evt){

		async function login(response){

			if(response.error){

			}

			setJWT(response.token);
			setLocalSessionUsername(response.username);
			setSessionUsername(response.username);

		}

		if(onboardingMethod === 'signup'){
			// const response = useAPICall('signup', 'post', formState);
			// first implement without `useAPICall
			try{
				const response = ShortCollabsAPI.signup(formState);
				login(response);
			}catch(error){

			}

		}

	}
	

	return(
	<div className="page">
		<form>

		</form>
	</div>
	);

}

export default OnboardingPage;