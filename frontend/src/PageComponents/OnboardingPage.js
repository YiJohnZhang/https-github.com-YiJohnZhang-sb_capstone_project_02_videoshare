import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import ShortCollabsAPI from '../helpers/api';
import useAuthenticationDependentRedirect from '../hooks/useAuthenticationDependentRedirect';
import useControlledForm from '../hooks/useControlledForm';
import useLocalStorage from '../hooks/useLocalStorage';
// import useAPICall from '../hooks/useAPICall';
import UserDetailsContext from '../context/UserDetailsContext';


function OnboardingPage({onboardingMethod}){

	// useAuthenticationDependentRedirect(false);

	const history = useHistory();
	const [jwt, setJWT] = useLocalStorage('jwt');
	const [localStorageUsername, setLocalStorageUsername] = useLocalStorage('sessionUsername');
	const [localStorageProfilePicture, setLocalStorageProfilePicture] = useLocalStorage('sessionProfilePicture');
	const { setSessionUsername, setSessionProfilePicture } = useContext(UserDetailsContext);
	const [formErrorText, setFormErrorText] = useState(undefined);

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
			birthdate: ''
		}

	}
	const [formState, setFormState] = useControlledForm(INITIAL_FORM_STATE);

	function formChangeHandler(evt){

		const {name, value} = evt.target
		setFormState(name, value);

	}

	async function onSubmitHandler(evt){

		evt.preventDefault();
		const thisForm = document.getElementById('onboardingForm');
		thisForm.reportValidity();
		// no formik or complicated form validation for now: see 01.01. Top Priorities
			// https://stackoverflow.com/a/52547062
			// webkit > 40, f > 49, o > 27: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity

		async function login(response){

			setJWT(response.token);
			setLocalStorageUsername(response.username);
			setSessionUsername(response.username);

			const { picture } = await ShortCollabsAPI.getUserData(response.username);
			setLocalStorageProfilePicture(picture);
			setSessionProfilePicture(picture);

			history.push('/');

		}

		if(onboardingMethod === 'signup'){

			try{

				const response = await ShortCollabsAPI.registerUser(formState);
				await login(response);

			}catch(error){
				// console.log(`formErrorElement.current.innerHTML: ${formErrorElement.current.innerHTML}`)
				setFormErrorText(`Error: ${error.message}`);
			}

		}else{

			try{

				const response = await ShortCollabsAPI.authenticateUser(formState);
				await login(response);

			}catch(error){
				setFormErrorText(`Error: ${error.message}`);
			}

		}

	}

	return(
	<div className="page">
	<form id="onboardingForm" className="row g-4 width-85percent margin-auto bootstrap-form marginTop-5pct">

		<div className="form-floating col-md-12">
			<input name="username"
				type="text" maxLength="32"
				className="form-control"
				placeholder="Username"
				onChange={formChangeHandler}
				value={formState.username} required/>
			<label className="" htmlFor="username">Username</label>
		</div>

		<div className="form-floating col-md-12">
			<input name="password"
				type="password" maxLength="64"
				className="form-control"
				placeholder="Password"
				onChange={formChangeHandler}
				value={formState.password} required/>
			<label className="" htmlFor="password">Password</label>
		</div>

		{onboardingMethod==='signup' && (
		<React.Fragment>
		<div className="form-floating col-md-6">
			<input name="firstName"
				type="text" maxLength="32"
				className="form-control"
				placeholder="First Name"
				onChange={formChangeHandler}
				value={formState.firstName} required/>
			<label className="" htmlFor="firstName">First Name</label>
		</div>
		<div className="form-floating col-md-6">
			<input name="lastName"
				type="text" maxLength="32"
				className="form-control"
				placeholder="Last Name"
				onChange={formChangeHandler}
				value={formState.lastName} required/>
			<label className="" htmlFor="lastName">Last Name</label>
		</div>

		<div className="form-floating col-md-6">
			<input name="email"
				type="text" maxLength="100"
				className="form-control"
				placeholder="Email"
				onChange={formChangeHandler}
				value={formState.email} required/>
			<label className="" htmlFor="email">Email</label>
		</div>
		<div className="form-floating col-md-6">
			<input name="birthdate"
				type="date"
				className="form-control"
				onChange={formChangeHandler}
				value={formState.birthdate} required/>
			<label className="" htmlFor="birthdate">Birthdate</label>
		</div>
		</React.Fragment>)}

		<div className="col-md-12">
			<button name={onboardingMethod==='signup' ? 'Sign Up!' : 'Login'}
				type="submit"
				className="form-control btn btn-outline-danger default-transition"
				onClick={onSubmitHandler}>
				{onboardingMethod==='signup' ? 'Sign Up!' : 'Login'}
				</button>
		</div>

		<div id="onboarding-formErrorContainer" className="col-md-12 formErrorContainer">
			<p id="onboarding-formErrorText" className="formErrorText">{formErrorText}</p>
		</div>
		
	</form>
	</div>
	);

}

export default OnboardingPage;