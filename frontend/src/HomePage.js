import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

import useControlledForm from './hooks/useControlledForm';

import './HomePage.css';
import ShortCollabsAPI from './helpers/api';
import UserDetailsContext from './context/UserDetailsContext';
import ContentCard from './ContentCard';
import UserCard from './UserCard';

function HomePage(props){

	// const history = useHistory();

	const INITIAL_FORM_STATE = {
		searchField:'',
		searchSelection:'searchContent'
	}

	const [formState, setFormState] = useControlledForm(INITIAL_FORM_STATE);
	const [matchingQuery, setMatchingQuery] = useState();

	useEffect(() => {

		async function searchUsers(){

			let userResult;
			if(formState.searchField){
				// userResult = await ShortCollabsAPI.searchUsers(formState.searchField);
				setMatchingQuery(userResult);
			}else{
				setMatchingQuery([]);
			}

		}

		async function searchContents(){

			let contentResult;
			if(formState.searchField){
				// contentResult = await ShortCollabsAPI.searchContents(formState.searchField);
				setMatchingQuery(contentResult);
			}else{
				// default: list trending content
				// contentResult = await ShortCollabsAPI.getAllContents();
				setMatchingQuery(contentResult);
			}

		}

		if(formState.searchSelection === 'searchContent'){
			searchContents();
		}
		
		searchUsers();
		
	}, [formState])

	function formChangeHandler(evt) {

		const {name, value} = evt.target;

		setFormState(name, value);
	}

	return(
	<div className="page">

		<div id="home-minorContainer" className="homeContainer width-15percent floatLeft">
			{props.randomText.map((element) => (
				<p key={element}
					className="homepage-minorFillerContent animation-400">
					{element}
				</p>
			))}
		</div>

		<div id="home-majorContainer" className="homeContainer width-85percent floatRight">
			<div id='home-searchbar' className=''>
			<form className="">
				<div className="input-group">

					<input name="searchField"
						type="text"
						id="searchtextfield"
						className="form-control"
						placeholder="search..."
						value={formState.searchField}
						onChange={formChangeHandler}/>
					<label className="visually-hidden" htmlFor="searchField">Search</label>
						
					<input name="searchSelection"
						type="radio"
						id="searchContent"
						className="btn-check"
						value="searchContent"
						checked={formState.searchSelection==="searchContent"}
						onChange={formChangeHandler} />
					<label className="btn btn-outline-danger" htmlFor="searchContent"><i className="fa-duotone fa-video"></i></label>

					<input name="searchSelection"
						type="radio"
						id="searchUser"
						className="btn-check"
						value="searchUser"
						checked={formState.searchSelection==="searchUser"}
						onChange={formChangeHandler} />
					<label className="btn btn-outline-danger" htmlFor="searchUser"><i className="fa-duotone fa-user"></i></label>

				</div>
			</form>
			</div>

			{/*todo: inject content here*/}
			{formState.searchSelection==='searchContent' ? (
				formState.searchField ?
					<h4>Searching "Contents" for "<em>{formState.searchField}</em>&nbsp;&nbsp;"...</h4> : null
			) : (
				formState.searchField ?
				<h4>Searching "Users" for " <em>{formState.searchField}</em>&nbsp;&nbsp;"...</h4> : <h4>Searching "Users" for... </h4>
			)}
			<div id="home-contentRoot">
			{formState.searchSelection==='searchContent' ? (
			<React.Fragment>
				{/*	// contents
				<ContentCard
					aspectRatio="horizontal"
					key={}
					/>
					*/}
			</React.Fragment>
			) : (
			<React.Fragment>
				{/* // users
				<UserCard
					aspectRatio="horizontal"
					key={} 
					/>
					*/}
			</React.Fragment>
			)}	
			</div>

		</div>

	</div>
	);

}

HomePage.defaultProps = {
	randomText: [
		'Lorem ipsum', 
		'dolor sit', 
		'amet,',
		'consectetur', 
		'adipiscing', 
		'elit, sed', 
		'do eiusmod'
	]
}

export default HomePage;