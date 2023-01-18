import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import ShortCollabsAPI from '../helpers/api';
import UserDetailsContext from '../context/UserDetailsContext';
import useAuthenticationDependentRedirect from '../hooks/useAuthenticationDependentRedirect';
import useControlledForm from '../hooks/useControlledForm';

function EditContentPage({ contentMethod }){

	useAuthenticationDependentRedirect(true);
	// not: authenticate user permissions in useEffect to save an API call

	const history = useHistory();
	const { contentID } = useParams();
	const { sessionUsername } = useContext(UserDetailsContext);
	const [formErrorText, setFormErrorText] = useState(undefined);

	let INITIAL_FORM_STATE;
	
	if(contentMethod==='create'){

		INITIAL_FORM_STATE = {
			title: '',
			description: '',
			summary: '',
			// link: '',
			contractType: 'solo',
			participants: `["${sessionUsername}"]`,
			contractDetails: `{"views":[{"username":"${sessionUsername}","share":1}],"engagement":[{"username":"${sessionUsername}","share":1}]}`
		}

	}else{

		INITIAL_FORM_STATE = {
			title: '',
			description: '',
			summary: '',
			link: '',
			participants: '',
			contractDetails: '',
			contractSigned: ''
		}

	}

	const [formState, updateFormState, resetFormState, overwriteFormState] = useControlledForm(INITIAL_FORM_STATE);
	const [contentStaticData, setContentStaticData] = useState({
		status: '', owner: '', dateCreated: '', contractType: '',
	});

	// Effect, Fetch Data
	useEffect(() => {

		async function fetchContentPrivateData(){

			try{

				const result = await ShortCollabsAPI.getFullContentData(contentID);
				
				const { title, summary, description, link, participants, contractDetails, contractSigned } = result;
					overwriteFormState({ title, summary, description, link, participants: JSON.stringify(participants), contractDetails: JSON.stringify(contractDetails), contractSigned: JSON.stringify(contractSigned) });
				
				const { status, owner, contractType, dateCreated, dateStandby } = result;
				setContentStaticData({ status, owner, contractType, dateCreated, dateStandby });

				if(status === 'published' || status === 'legacy')
					history.push(`/user/${sessionUsername}/${contentID}/edit`)
					// backend blocking works, now protecc the from the front-end :)

			}catch(error){
				
				// user does not have permissions or this content is published.
				console.log(error);
				history.push('/');
					// push to home for now, consider going to error page
				
			}

		}

		setFormErrorText('');
			// reset error field

		if(contentMethod === 'update'){
			overwriteFormState(INITIAL_FORM_STATE);
				// reinit form fields (upon contentMethod change)
			fetchContentPrivateData();
		}else{
			overwriteFormState(INITIAL_FORM_STATE);
				// reinit form fields (upon contentMethod change)
		}

	}, [contentMethod]);

	function formChangeHandler(evt){

		const {name, value} = evt.target;
		updateFormState(name, value);

	}

	async function onSubmitHandler(evt){

		setFormErrorText('');
			// reset error message

		evt.preventDefault();
		const thisForm = document.getElementById('editContentForm');
		if(!thisForm.reportValidity())
			return;
		// no formik or complicated form validation for now: see 01.01. Top Priorities
			// https://stackoverflow.com/a/52547062

		if(contentMethod==='create'){

			// jsonify the data
			// this can be removed if there is a comprehensive front-end validator and using the proposed GUI sign implementation
			const parsedForm = {
				...formState,
				participants: JSON.parse(formState.participants),
				contractDetails: JSON.parse(formState.contractDetails),
				owner: sessionUsername
			}

			try{

				const result = await ShortCollabsAPI.createContent(parsedForm);
				const { content_id } = result; 
				history.push(`/edit/${content_id}`)

			}catch(error){

				// usually form validation error or user session provides invalid token
				setFormErrorText(`Error: ${error.message}`);
				// handle fk error

				console.log(error);
					// do nothing else for now
				
			}

		}else{

			// jsonify the data
			// this can be removed if there is a comprehensive front-end validator and using the proposed GUI sign implementation
			const parsedForm = {
				...formState,
				participants: JSON.parse(formState.participants),
				contractDetails: JSON.parse(formState.contractDetails),
				contractSigned: JSON.parse(formState.contractSigned),
				owner: contentStaticData.owner,
				contractType: contentStaticData.contractType
			}

			try{
				
				await ShortCollabsAPI.patchContentData(contentID, parsedForm);
				// history.push(`/user/${sessionUsername}`);

			}catch(error){

				console.log(`${error.message.detail || error.message}`);
				// usually form validation error or user session provides invalid token
				setFormErrorText(`Error: ${error.message.detail || error.message}`);
					// do nothing else for now

			}

		}

	}

	async function publishHandler(evt){

		setFormErrorText('');
			// reset error message
		
		evt.preventDefault();
		const thisForm = document.getElementById('editContentForm');
		if(!thisForm.reportValidity())
			return;
		// no formik or complicated form validation for now: see 01.01. Top Priorities
			// https://stackoverflow.com/a/52547062

		try{

			await ShortCollabsAPI.publishContent(contentID);
			history.push(`/user/${sessionUsername}`);
				// subject to change: maybe push to the contents, idk

		}catch(error){
			
			console.error(`${error || error.message}`);
			// usually form validation error or user session provides invalid token
			setFormErrorText(`Error: ${error.message}`);
			// console.log(error || error.message);
				// do nothing else for now

		}

	}

	function participantsMatchSignedParties(){

		// further study: add standby / open check

		if(contentStaticData.contractType==='solo')
			return true;
		
		// const participantsSet = new Set(JSON.parse(formState.participants));
		const participantsSet = new Set(formState.participants.split(','));
		// const contractSignatories = JSON.parse(formState.contractSigned);
		const contractSignatories = formState.contractSigned.split(',');

		if(participantsSet.size !== contractSignatories.length)
			return false;

		for(let i = 0; i < contractSignatories.length; i++){

			if(participantsSet.has(contractSignatories[i]))
				return true;

		}

		return false;

	}

	return(
	<div className="page">
	<form id="editContentForm" className="row g-4 width-85percent margin-auto bootstrap-form marginTop-5pct">
		
		<div id="form-information" className="col-md-12">
			<h2>{contentMethod === 'create' ? 'Create' : 'Update'} "{formState.title}"</h2>
		</div>

		<div className="form-floating col-md-12">
			<input name="title"
				type="text" maxLength="64"
				className="form-control"
				placeholder="Content Title (max 64 characters)"
				onChange={formChangeHandler}
				value={formState.title} required/>
			<label className="" htmlFor="title">Title</label>
		</div>

		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="summary">Summary</label>
			<textarea name="summary"
				className="form-control"
				maxLength="512"	rows={3}
				placeholder="Summary (max 512 characters)"
				onChange={formChangeHandler}
				value={formState.summary} required/>
		</div>

		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="description">Description</label>
			<textarea name="description"
				className="form-control"
				maxLength={2200} rows={6}
				placeholder="Description (max 2200 characters)"
				onChange={formChangeHandler}
				value={formState.description} required={contentMethod==='update'}/>
		</div>

		{contentMethod==='create' && (
		<React.Fragment>
		{/* <div className="col-md-3"><strong>Monetization Type</strong></div> */}
		<div className="form-floating col-md-12">
			<select name="contractType"
				className="form-select form-select-sm"
				onChange={formChangeHandler}
				value={formState.contractType}>
				<option value="solo">Solo</option>
				<option value="byview">By View: Monetization by the algorithm god(s).</option>
				<option value="presplit">Pre-Split: Agree to a monetization scheme.</option>
			</select>
			<label className="" htmlFor="contractType">Monetization Type</label>	
		</div>
		</React.Fragment>
		)}

		{contentMethod==='update' && (
		<React.Fragment>

			<div className="form-floating col-md-12">
				<input name="link"
					type="text" maxLength="100"
					className="form-control"
					placeholder="Content Link (max 100 characters)"
					onChange={formChangeHandler}
					value={formState.link} /*required={}*//>
				<label className="" htmlFor="link">Link</label>
			</div>

			<div className="col-md-3">
				<p><strong>Status</strong>: {contentStaticData.status}</p>
			</div>
			<div className="col-md-3">
				<p><strong>Owner</strong>: <Link to={`/user/${contentStaticData.owner}`}>{contentStaticData.owner}</Link></p>
			</div>
			<div className="col-md-3">
				<p><strong>Date Created</strong>: {contentStaticData.dateCreated.substring(0, 10)}</p>
			</div>
			<div className="col-md-3">
				<p><strong>Contract Type</strong>: {contentStaticData.contractType}</p>
			</div>

		</React.Fragment>
		)}
		
		<div className="form-floating col-md-12">
			<input name="participants"
				type="text"
				className="form-control"
				placeholder="Participants (Array Type)"
				onChange={formChangeHandler}
				value={formState.participants}
				// disabled={contentStaticData.owner!==sessionUsername && contentMethod!=='create'}
				required={contentStaticData.contractSigned!=='solo'||formState.contractSigned!=='solo'}
				/>
			<label className="" htmlFor="participants">Participants (Array Type)</label>
		</div>

		<div className="form-floating col-md-12">
			<input name="contractDetails"
				type="text"
				className="form-control"
				placeholder="Contract Details (Object Type)"
				onChange={formChangeHandler}
				value={formState.contractDetails} />
			<label className="" htmlFor="contractDetails">Contract Details (Object Type)</label>
		</div>
		
		{contentMethod==='update' && (
		<div className="form-floating col-md-12">
			<input name="contractSigned"
				type="text"
				className="form-control"
				placeholder="Contract Signed (Array Type)"
				onChange={formChangeHandler}
				value={formState.contractSigned}
				required={contentStaticData.contractSigned!=='solo'||formState.contractSigned!=='solo'}
				/>
			<label className="" htmlFor="contractSigned">Contract Signatories (Array Type)</label>
		</div>
		)}

		<div id="editContent-formErrorContainer" className="col-md-12 formErrorContainer">
			<p id="editContent-formErrorText" className="formErrorText">{formErrorText}</p>
		</div>

		{contentMethod==='update' && (

			<div className="col-md-6">
				<button name='publish'
					type="submit"
					className="form-control btn btn-outline-danger default-transition"
					onClick={publishHandler}
					disabled={Boolean(formState.link) === false || contentStaticData.owner!==sessionUsername || !participantsMatchSignedParties()}>
					Publish!
				</button>
			</div>

		)}

		<div className={`col-md-${contentMethod==='create' ? 12 : 6}`}>
			<button name={contentMethod==='create' ? 'create' : 'update'}
				type="submit"
				className="form-control btn btn-outline-success default-transition"
				onClick={onSubmitHandler}>
				{contentMethod==='create' ? 'Create!' : 'Update'}
			</button>
		</div>
		
	</form>
	</div>
	);

}

export default EditContentPage;