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

	async function clickHandler(evt){

		evt.preventDefault();

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

		}else{

		}

	}
	

	return(
	<div className="page">
	<form className="row g-4 width-85percent autoMargin">
		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="username">Username</label>
			<div className="input-group">
				<div className="input-group-text">@</div>
				<input name="username"
					type="text"
					className="form-control"
					placeholder="Username"
					onChange={formChangeHandler}
					value={formState.username} />
			</div>
		</div>
		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="password">Password</label>
			<input name="password"
				type="password"
				className="form-control"
				placeholder="Password"
				onChange={formChangeHandler}
				value={formState.password} />
		</div>

		{onboardingMethod === 'signup' && (
		<React.Fragment>
		<div className="col-md-6">
			<label className="visually-hidden" htmlFor="firstName">First Name</label>
			<input name="firstName"
				type="text"
				className="form-control"
				placeholder="First Name"
				onChange={formChangeHandler}
				value={formState.firstName} />
		</div>
		<div className="col-md-6">
			<label className="visually-hidden" htmlFor="lastName">Last Name</label>
			<input name="lastName"
				type="text"
				className="form-control"
				placeholder="Last Name"
				onChange={formChangeHandler}
				value={formState.lastName} />
		</div>
		<div className="col-md-6">
			<label className="visually-hidden" htmlFor="email">Email</label>
			<input name="email"
				type="text"
				className="form-control"
				placeholder="Email"
				onChange={formChangeHandler}
				value={formState.email} />
		</div>
		<div className="col-md-6">
			<label className="visually-hidden" htmlFor="birthdate">Birthdate</label>
			<input name="birthdateYear"
				type="date"
				className="form-control"
				onChange={formChangeHandler}
				value={formState.birthdate} />
		</div>
		</React.Fragment>)}

		<div className="col-md-12">
			<button name={onboardingMethod==='signup' ? 'Sign Up!' : 'Login'}
				type="date"
				className="form-control btn btn-outline-danger animation-400"
				onClick={clickHandler}>
					{onboardingMethod==='signup' ? 'Sign Up!' : 'Login'}
				</button>
		</div>
		
	</form>
	</div>
	);

}

export default OnboardingPage;