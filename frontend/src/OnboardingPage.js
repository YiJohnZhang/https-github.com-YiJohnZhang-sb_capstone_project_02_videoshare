import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import useAuthenticationDependentRedirect from './hooks/useAuthenticationDependentRedirect';
import useControlledForm from './hooks/useControlledForm';
import useLocalStorage from './hooks/useLocalStorage';
import ShortCollabsAPI from './helpers/api';
// import useAPICall from './hooks/useAPICall';
import UserDetailsContext from './context/UserDetailsContext';


function OnboardingPage({onboardingMethod}){

	useAuthenticationDependentRedirect(false);

	const history = useHistory();
	const [jwt, setJWT] = useLocalStorage('jwt');
	const { setSessionUsername } = useContext(UserDetailsContext);

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
			email: '',
			birthdateYear: '',
			birthdateMonth: '',
			birthdateDay: ''
			//	...
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
		// thisForm.reportValidity();
			// https://stackoverflow.com/a/52547062
			// webkit > 40, f > 49, o > 27: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity

		async function login(response){

			setJWT(response.token);
			// setLocalSessionUsername(response.username);
			setSessionUsername(response.username);

			// history.push('/');

		}

		if(onboardingMethod === 'signup'){

			try{

				const response = ShortCollabsAPI.signup(formState);
				login(response);

			}catch(error){
				console.log(error);
				// stay at page? and display error?
			}

		}else{

			try{

				const response = ShortCollabsAPI.signup(formState);
				login(response);

			}catch(error){
				console.log(error);
				// stay at page? and display error?
			}

		}

	}

	return(
	<div className="page">
	<form id="onboardingForm" className="row g-4 width-85percent autoMargin">

		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="username">Username</label>
			<div className="input-group">
				<div className="input-group-text">@</div>
				<input name="username"
					type="text" maxLength="32"
					className="form-control"
					placeholder="Username"
					onChange={formChangeHandler}
					value={formState.username} required/>
			</div>
		</div>

		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="password">Password</label>
			<input name="password"
				type="password" maxLength="64"
				className="form-control"
				placeholder="Password"
				onChange={formChangeHandler}
				value={formState.password} required/>
		</div>

		{onboardingMethod==='signup' && (
		<React.Fragment>
		<div className="col-md-6">
			<label className="visually-hidden" htmlFor="firstName">First Name</label>
			<input name="firstName"
				type="text" maxLength="32"
				className="form-control"
				placeholder="First Name"
				onChange={formChangeHandler}
				value={formState.firstName} required/>
		</div>
		<div className="col-md-6">
			<label className="visually-hidden" htmlFor="lastName">Last Name</label>
			<input name="lastName"
				type="text" maxLength="32"
				className="form-control"
				placeholder="Last Name"
				onChange={formChangeHandler}
				value={formState.lastName} required/>
		</div>

		<div className="col-md-6">
			<label className="visually-hidden" htmlFor="email">Email</label>
			<input name="email"
				type="text" maxLength="100"
				className="form-control"
				placeholder="Email"
				onChange={formChangeHandler}
				value={formState.email} required/>
		</div>
		<div className="col-md-6">
			<label className="visually-hidden" htmlFor="birthdate">Birthdate</label>
			<input name="birthdate"
				type="date"
				className="form-control"
				onChange={formChangeHandler}
				value={formState.birthdate} required/>
		</div>
		</React.Fragment>)}

		<div className="col-md-12">
			<button name={onboardingMethod==='signup' ? 'Sign Up!' : 'Login'}
				type="submit"
				className="form-control btn btn-outline-danger animation-400"
				onClick={onSubmitHandler}>
				{onboardingMethod==='signup' ? 'Sign Up!' : 'Login'}
				</button>
		</div>
		
	</form>
	</div>
	);

}

export default OnboardingPage;