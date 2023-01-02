import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';



import ShortCollabsAPI from './helpers/api';
import UserDetailsContext from './context/UserDetailsContext';
import useAuthenticationDependentRedirect from './hooks/useAuthenticationDependentRedirect';
import useControlledForm from './hooks/useControlledForm';

function EditContentPage({ contentMethod }){

	// useAuthenticationDependentRedirect(true);
	// not: authenticate user permissions in useEffect to save an API call

	// username, title, summary, status, accountStatus, birthdate, picture, description, password 

	const history = useHistory();
	const { contentId } = useParams();
	const { sessionUsername } = useContext(UserDetailsContext);

	let INITIAL_FORM_STATE;
	
	if(contentMethod==='create'){

		INITIAL_FORM_STATE = {
			title: '',
			description: '',
			summary: '',
			// lnk
			contractType: 'solo',
			participants: `["${sessionUsername}"]`,
			contractDetails: `{views:[{username:${sessionUsername},share:1}],engagement:[{username:${sessionUsername},share:1}]}`
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

	useEffect(() => {

		async function fetchContentPrivateData(){

			try{

				// const result = await ShortCollabsAPI.getFullContentData();
				
				// const { title, summary, description, link, participants, contractDetails, contractSigned } = result;
				// 	overwriteFormState({ title, summary, description, link, participants, contractDetails, contractSigned });
				
				// const { status, owner, contractType, dateCreated, dateStandby } = result;
				// setContentStaticData({ status, owner, contractType, dateCreated, dateStandby });		
				// updateFormState()

			}catch(error){
				// user does not have permissions or this content is published.
				// if()
			}

		}

		if(contentMethod === 'update'){
			fetchContentPrivateData();
		}

	}, []);

	function formChangeHandler(evt){

		const {name, value} = evt.target;
		updateFormState(name, value);

	}

	function onSubmitHandler(evt){

		evt.preventDefault();
		const thisForm = document.getElementById('editContentForm');
		// thisForm.reportValidity();
			// https://stackoverflow.com/a/52547062

		if(contentMethod==='create'){

			// try{
			// 	await ShortCollabsAPI.createContent();
			// }catch(error){

			// }

		}else{

			// try{
			// 	await ShortCollabsAPI.patchContent();
			// }catch(error){

			// }

		}

	}

	function publishHandler(evt){
		
		evt.preventDefault();
		const thisForm = document.getElementById('editContentForm');
		// thisForm.reportValidity();
			// https://stackoverflow.com/a/52547062

		// try{
		// 	await ShortCollabsAPI.publishContent();
		// }catch(error){

		// }

	}

	function participantsMatchSignedParties(){

		if(contentStaticData.contractType==='solo')
			return true;
		
		const participantsSet = new Set(JSON.parse(formState.participants));
		const contractSignatories = JSON.parse(formState.contractSigned);
		
		if(participantsSet.size !== contractSignatories.length)
			return false;

		function _contractIsSigned(signatoryIndex = 0){

			if(signatoryIndex === contractSignatories.length)
				return true;

			return participantsSet.has(contractSignatories[signatoryIndex]) && _contractIsSigned(signatoryIndex + 1);

		}

		return _contractIsSigned();
	}

	return(
	<div className="page">
		{/* todo: */}
	<form id="editContentForm" className="row g-4 width-85percent autoMargin">
		
		<h1>{contentMethod === 'create' ? `Create ${formState.title}` : `Update ${formState.title}`}</h1>
		
		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="title">Title</label>
			<input name="title"
				type="text" maxLength="???"
				className="form-control"
				placeholder="Content Title (max 64 characters)"
				onChange={formChangeHandler}
				value={formState.title} required/>
		</div>

		<div className="col-md-12">
			<textarea name="summary"
				className="form-control"
				maxLength="512"	rows={3}
				placeholder="Summary (max 512 characters)"
				onChange={formChangeHandler}
				value={formState.summary} />
		</div>

		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="link">Description</label>
			<textarea name="description"
				className="form-control"
				maxLength={2200} rows={6}
				placeholder="Description (max 2200 characters)"
				onChange={formChangeHandler}
				value={formState.link} required/>
		</div>

		{contentMethod==='create' && (
		<React.Fragment>
		<div className="col-md-3"><strong>Monetization Type</strong></div>
		<div className="col-md-9">
			<select name="contractType"
				className="form-select form-select-sm"
				onChange={formChangeHandler}
				value={formState.contractType}>
				<option value="solo">Solo</option>
				<option value="byview">By View: Monetization by the algorithm god(s).</option>
				<option value="presplit">Pre-Split: Agree to a monetization scheme.</option>
			</select>
			
		</div>
		</React.Fragment>
		)}

		{contentMethod==='update' && (
		<React.Fragment>

			<div className="col-md-3">
				<p><strong>Status</strong>: {contentStaticData.status}</p>
			</div>
			<div className="col-md-3">
				<p><strong>Owner</strong>: <Link to={`user/${contentStaticData.owner}`}>{contentStaticData.owner}</Link></p>
			</div>
			<div className="col-md-3">
				<p><strong>Date Created</strong>: {contentStaticData.dateCreated}</p>
			</div>
			<div className="col-md-3">
				<p><strong>Contract Type</strong>: {contentStaticData.contractType}</p>
			</div>

		</React.Fragment>
		)}
		
		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="participants">Participants</label>
			<input name="participants"
				type="text"
				className="form-control"
				placeholder="Participants (Array Type)"
				onChange={formChangeHandler}
				value={formState.participants}
				disabled={contentStaticData.owner!==sessionUsername && contentMethod!=='create'}
				required={contentStaticData.contractSigned!=='solo'||formState.contractSigned!=='solo'}
				/>
		</div>

		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="contractDetails">Contract Details</label>
			<input name="contractDetails"
				type="text"
				className="form-control"
				placeholder="Contract Details (Object Type)"
				onChange={formChangeHandler}
				value={formState.contractDetails} />
		</div>
		
		{contentMethod==='update' && (
		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="contractSigned">Contract Signatories</label>
			<input name="contractSigned"
				type="text"
				className="form-control"
				placeholder="Contract Signed (Array Type)"
				onChange={formChangeHandler}
				value={formState.contractSigned}
				required={contentStaticData.contractSigned!=='solo'||formState.contractSigned!=='solo'}
				/>
		</div>
		)}

		{contentMethod==='update' && (

			<div className="col-md-6">
				<button name={contentMethod==='update'}
					type="submit"
					className="form-control btn btn-outline-danger animation-400"
					onClick={publishHandler}
					disabled={(formState.link == null || formState.link == '') || contentStaticData.owner!==sessionUsername || participantsMatchSignedParties()}>
					Publish!
				</button>
			</div>

		)}
		<div className={`col-md-${contentMethod==='create' ? 12 : 6}`}>
			<button name={contentMethod==='create' ? 'create!' : 'update'}
				type="submit"
				className="form-control btn btn-outline-success animation-400"
				onClick={onSubmitHandler}>
				{contentMethod==='create' ? 'Create!' : 'Update'}
			</button>
		</div>

	</form>
	</div>
	);

}

export default EditContentPage;