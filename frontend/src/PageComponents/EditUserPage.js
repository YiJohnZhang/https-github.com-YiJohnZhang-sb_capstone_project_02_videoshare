import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import useAuthenticationDependentRedirect from '../hooks/useAuthenticationDependentRedirect';
import useControlledForm from '../hooks/useControlledForm';
import UserDetailsContext from '../context/UserDetailsContext';

import ShortCollabsAPI from '../helpers/api';

function EditUserPage(){

	// username, title, summary, status, accountStatus, birthdate, picture, description, password 

	// useAuthenticationDependentRedirect(true);
	const history = useHistory();

	const { sessionUsername } = useContext(UserDetailsContext);
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

	useEffect(() => {

		async function fetchUserPrivateDetails(){

			try{
						
				const userDetails = await ShortCollabsAPI.getFullUserData(sessionUsername);
			
				const { firstName, lastName, picture, description } = userDetails;
				overwriteFormState({ firstName, lastName, picture, description });
					// modifiable user details

				const { email, accountStatus, birthdate } = userDetails;
				setUserStaticData({email, accountStatus, birthdate});
					// static user details

			}catch(error){

				console.log(error);
				// usually form validation errors, user does not have permissions or this content is published.
				history.push('/');
					// push to home for now, consider going to error page
			}

		}

		fetchUserPrivateDetails();

	}, []);

	function onSubmitHandler(evt){

		evt.preventDefault();
		const thisForm = document.getElementById('editUserForm');
		thisForm.reportValidity();
		// no formik or complicated form validation for now: see 01.01. Top Priorities
			// https://stackoverflow.com/a/52547062

		try{
	
			await ShortCollabsAPI.patchUser(sessionUsername, formState);
	
		}catch(error){
			// error handling: stay on page and maybe dispaly errors or somethign.
		}

		history.push(`/user/${sessionUsername}`);

	}

	return(
	<div className="page">
	<form id="editUserForm" className="row g-4 width-85percent margin-auto bootstrap-form marginTop-5pct">
		
		<div id="form-information" className="col-md-12">
			<h2>Hello, {sessionUsername}.</h2>
		</div>
		
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

		<div className="col-md-4">
			<p><strong>Email</strong>: {userStaticData.email}</p>
		</div>
		<div className="col-md-4">
			<p><strong>Account Status</strong>: {userStaticData.accountStatus}</p>
		</div>
		<div className="col-md-4">
			<p><strong>Birth Date</strong>: {userStaticData.birthdate}</p>
		</div>
		
		<div className="form-floating col-md-12">
			<input name="picture"
				type="text" maxLength="64"
				className="form-control"
				placeholder="Picture Link"
				onChange={formChangeHandler}
				value={formState.picture} required/>
			<label className="" htmlFor="picture">Picture Link</label>
		</div>
		
		<div className="col-md-12">
			<textarea name="description"
				type="text" maxLength="512" rows="3" 
				className="form-control"
				placeholder="Description (max 512 characters)"
				onChange={formChangeHandler}
				value={formState.description} required/>
		</div>
		
		<div className="form-floating col-md-12">
			<input name="password"
				type="text" maxLength="64"
				className="form-control"
				placeholder="New Password"
				onChange={formChangeHandler}
				value={formState.password} required/>
			<label className="" htmlFor="password">Password</label>
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