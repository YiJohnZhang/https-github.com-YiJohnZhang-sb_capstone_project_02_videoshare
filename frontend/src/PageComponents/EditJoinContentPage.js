import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import ShortCollabsAPI from '../helpers/api';
import UserDetailsContext from '../context/UserDetailsContext';
import useAuthenticationDependentRedirect from '../hooks/useAuthenticationDependentRedirect';
import useControlledForm from '../hooks/useControlledForm';

import ContentCard from '../DumbComponents/ContentCard';

function EditContentPage(){

	// useAuthenticationDependentRedirect(true);
	// not: authenticate user permissions in useEffect to save an API call

	const history = useHistory();
	const { contentID } = useParams();
	const { sessionUsername } = useContext(UserDetailsContext);

	const INITIAL_FORM_STATE = {
	
		description: '',
	
	}

	const [formState, updateFormState, resetFormState, overwriteFormState] = useControlledForm(INITIAL_FORM_STATE);

	//	... give a preview?
	const [contentStaticData, setContentStaticData] = useState({
		id: '', title: '', link: '', participants: [], dateCreated: '', dateStandby: '', datePublished: ''
	});

	useEffect(() => {

		async function getContentData(){

			try{

				const result = await ShortCollabsAPI.getJoinContentData(sessionUsername, contentID);
				
				const { description } = result;
					overwriteFormState({ description });
				
				const { id, title, link, participants, dateCreated, dateStandby, datePublished } = result;
				setContentStaticData({ id, title, link, participants, dateCreated, dateStandby, datePublished });

			}catch(error){
				
				// user does not have permissions or this content is published.
				history.push('/');
					// push to home for now, consider going to error page

			}

		}

		getContentData();

	}, []);

	function formChangeHandler(evt){

		const {name, value} = evt.target;
		updateFormState(name, value);

	}

	async function updateHandler(evt){
		
		evt.preventDefault();
		const thisForm = document.getElementById('editJoinContentForm');
		thisForm.reportValidity();
		// no formik or complicated form validation for now: see 01.01. Top Priorities
			// https://stackoverflow.com/a/52547062

		try{
			await ShortCollabsAPI.patchJoinContent(sessionUsername, contentID, formState);
		}catch(error){
			
			console.log(error);
			// usually form validation errors, user does not have permissions or this content is published.

		}

		history.push(`/user/${sessionUsername}`);

	}

	return(
	<div className="page">
	<form id="editJoinContentForm" className="row g-4 width-85percent margin-auto bootstrap-form marginTop-5pct">
		
		<div id="form-information" className="col-md-12">
			<h2>Edit "{contentStaticData.title}"</h2>
		</div>

		<div className="col-md-12">
			<label className="visually-hidden" htmlFor="description">Description</label>
			<textarea name="description"
				className="form-control"
				maxLength={2200} rows={6}
				placeholder="Description (max 2200 characters)"
				onChange={formChangeHandler}
				value={formState.description} required/>
		</div>

		<div className="col-md-4">
			<p><strong>Date Created</strong>: {contentStaticData.dateCreated ? contentStaticData.dateCreated.substring(0, 10) : contentStaticData.dateCreated}</p>
		</div>
		<div className="col-md-4">
			<p><strong>Date Standby</strong>: {contentStaticData.dateStandby ? contentStaticData.dateStandby.substring(0, 10) : 'Not yet signed.'}</p>
		</div>
		<div className="col-md-4">
			<p><strong>Date Published</strong>: {contentStaticData.datePublished ? contentStaticData.datePublished.substring(0, 10) : 'Not yet published.'}</p>
		</div>

		<div className="col-md-12">
			<button name="submit"
				type="submit"
				className="form-control btn btn-outline-success default-transition"
				onClick={updateHandler}
				>
				Update
			</button>
		</div>
		<div className="spacing-16px"></div>
		<div className="spacing-16px"></div>

		{/* todo: preview? */}
		<div id="" className="col-md-12">
			<h2>Edit Preview {formState.title}</h2>
		</div>
		<ContentCard isProfile = {true}
			contentID={contentID || contentStaticData.id}
			title={contentStaticData.title}
			description={formState.description}
			link={contentStaticData.link}
			participants={contentStaticData.participants}
			datePublished={contentStaticData.datePublished}
			/>

	</form>
	</div>
	);

}

export default EditContentPage;