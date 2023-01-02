import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import useAuthenticationDependentRedirect from './hooks/useAuthenticationDependentRedirect';
import useControlledForm from './hooks/useControlledForm';
import UserDetailsContext from './context/UserDetailsContext';

import ShortCollabsAPI from './helpers/api'

function EditUserPage(){

	// useAuthenticationDependentRedirect(true);
	const history = useHistory();

	const {sessionUsername} = useContext(UserDetailsContext);
	const [userStaticData, setUserStaticData] = useState({
		email: '', accountStatus: '', birthdate: ''
	});

	const INITIAL_FORM_STATE = {

		firstName: '',
		lastName: '',
		picture: '',
		description: '',
		password: ''

	}

	const [formState, updateFormState, resetFormState, overwriteFormState] = useControlledForm(INITIAL_FORM_STATE);
	
	function formChangeHandler(evt){

		const {name, value} = evt.target;
		updateFormState(name, value);

	}

	function onSubmitHandler(evt){

		const thisForm = document.getElementById('onboardingForm');
		// thisForm.reportValidity();
			// https://stackoverflow.com/a/52547062

		evt.preventDefault();
		try{
	
			//const patchUser = await ShortCollabsAPI.patchUserData(formState);
			history.push('/');
	
		}catch(error){
			// error handling: stay on page and maybe dispaly errors or somethign.
		}

	}

	useEffect(() => {

		async function fetchUserPrivateDetails(){

			try{
						
				const userDetails = await ShortCollabsAPI.getUserPrivateData(sessionUsername);
			
				const { firstName, lastName, picture, description } = userDetails;
				overwriteFormState({ firstName, lastName, picture, description });
					// modifiable user details

				const { email, accountStatus, birthdate } = userDetails;
				setUserStaticData({email, accountStatus, birthdate});
					// static user details

			}catch(error){
				// error handling
			}

		}

		fetchUserPrivateDetails();

	}, []);


	return(
	<div className="page">
	<form id="editUserForm" className="row g-4 width-85percent autoMargin">
		
		<div className="col-md-12">
			<p>Hello, {sessionUsername}.</p>
		</div>
		
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

		<div className="col-md-4">
			<p><strong>Email</strong>: {userStaticData.email}</p>
		</div>
		<div className="col-md-4">
			<p><strong>Account Status</strong>: {userStaticData.accountStatus}</p>
		</div>
		<div className="col-md-4">
			<p><strong>Birth Date</strong>: {userStaticData.birthdate}</p>
		</div>
		
		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="picture">Picture</label>
			<input name="picture"
				type="text" maxLength="64"
				className="form-control"
				placeholder="Picture Link"
				onChange={formChangeHandler}
				value={formState.picture} required/>
		</div>
		
		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="description">Description</label>
			<input name="description"
				type="text" maxLength="512"
				className="form-control"
				placeholder="Description..."
				onChange={formChangeHandler}
				value={formState.description} required/>
		</div>
		
		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="password">Password</label>
			<input name="password"
				type="text" maxLength="64"
				className="form-control"
				placeholder="New Password"
				onChange={formChangeHandler}
				value={formState.password} required/>
		</div>

		<div className="col-md-12">
			<button name="submitChanges"
				type="submit"
				className="form-control btn btn-outline-primary animation-400"
				onClick={onSubmitHandler}>
					Confirm Changes
				</button>
		</div>

	</form>
	</div>
	);

}

export default EditUserPage;