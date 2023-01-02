import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import ShortCollabsAPI from './helpers/api';
import UserDetailsContext from './context/UserDetailsContext';
import useAuthenticationDependentRedirect from './hooks/useAuthenticationDependentRedirect';
import useControlledForm from './hooks/useControlledForm';

import ContentCard from './ContentCard';

function EditContentPage(){

	// useAuthenticationDependentRedirect(true);
	// not: authenticate user permissions in useEffect to save an API call

	const history = useHistory();
	const { contentId } = useParams();
	const { sessionUsername } = useContext(UserDetailsContext);

	const INITIAL_FORM_STATE = {
	
		description: '',
	
	}

	const [formState, updateFormState, resetFormState, overwriteFormState] = useControlledForm(INITIAL_FORM_STATE);

	//	... give a preview?
	const [contentStaticData, setContentStaticData] = useState({
		id: '', title: '', link: '', participants: '', dateCreated: '', dateStandby: '', datePublished: ''
	});

	useEffect(() => {

		async function getContentData(){

			try{

				// const result = await ShortCollabsAPI.getJoinContentData();
				
				// const { description } = result;
				// 	overwriteFormState({ description });
				
				// const { id, title, link, participants, dateCreated, dateStandby, datePublished } = result;
				// setContentStaticData({ id, title, link, participants, dateCreated, dateStandby, datePublished });
				// updateFormState()

			}catch(error){
				// user does not have permissions or this contentStaticData is published.
				// if()
			}

		}

		getContentData();

	}, []);

	function formChangeHandler(evt){

		const {name, value} = evt.target;
		updateFormState(name, value);

	}

	function updateHandler(evt){
		
		evt.preventDefault();
		const thisForm = document.getElementById('editJoinContentForm');
		// thisForm.reportValidity();
			// https://stackoverflow.com/a/52547062

		// try{
		// 	await ShortCollabsAPI.patchJoinContent();
		// }catch(error){

		// }

	}

	return(
	<div className="page">
	<form id="editJoinContentForm" className="row g-4 width-85percent margin-auto bootstrap-form marginTop-5pct">
		
		<div id="form-information" className="col-md-12">
			<h2>Edit {contentStaticData.title}</h2>
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
			<p><strong>Date Created</strong>: {contentStaticData.dateCreated}</p>
		</div>
		<div className="col-md-4">
			<p><strong>Date Standby</strong>: {contentStaticData.dateStandby}</p>
		</div>
		<div className="col-md-4">
			<p><strong>Date Published</strong>: {contentStaticData.datePublished}</p>
		</div>

		<div className="col-md-12">
			<button name="submit"
				type="submit"
				className="form-control btn btn-outline-success animation-400"
				onClick={updateHandler}
				>
				Update
			</button>
		</div>
		<div class='spacing-16px'></div>

		{/* todo: preview? */}
		<div id="" className="col-md-12">
			<h2>Edit Preview {formState.title}</h2>
		</div>
		<div class='spacing-16px'></div>
		{/* <ContentCard aspectRatio="tall"
			contentID={contentId || contentStaticData.id}
			title={contentStaticData.title}
			description={formState.description}
			link={contentStaticData.link}
			participants={contentStaticData.participants}
			datePublished={contentStaticData.datePublished}
			/> */}

	</form>
	</div>
	);

}

export default EditContentPage;