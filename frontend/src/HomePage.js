import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

import useControlledForm from './hooks/useControlledForm';

import './HomePage.css';
import ShortCollabsAPI from './helpers/api';
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
		<div id='home-searchbar' className='width-85percent'>
		<form>
			<div className="input-group">

				<input name="searchField"
					type="text"
					id="searchtextfield"
					className="form-control"
					placeholder="search..."
					value={formState.searchField}
					onChange={formChangeHandler}/>
					
				<input name="searchSelection"
					type="radio"
					id="searchContent"
					className="btn-check"
					value="searchContent"
					checked={formState.searchSelection==="searchContent"}
					onChange={formChangeHandler} />
				<label className="btn btn-secondary" htmlFor="searchContent"><i className="fa-duotone fa-video"></i></label>

				<input name="searchSelection"
					type="radio"
					id="searchUser"
					className="btn-check"
					value="searchUser"
					checked={formState.searchSelection==="searchUser"}
					onChange={formChangeHandler} />
				<label className="btn btn-secondary" htmlFor="searchUser"><i className="fa-duotone fa-user"></i></label>

			</div>
		</form>
		</div>
		<div id="home-minorContainer" className="homeContainer width-15percent floatLeft">
			{props.randomText.map((element) => (
				<p key={element}
					className="homepage-minorFillerContent animation-400">
					{element}
				</p>
			))}
		</div>
		<div id="home-majorContainer" className="homeContainer width-85percent floatRight">
			<p>placeholder</p>
			{/*inject content here*/}
			{formState.searchSelection==='searchContent' ? (
				<>Inject Contents Here</>
				// contents
				/* <ContentCard
					aspectRatio="horizontal"
					key={}
					/>
					*/
			) : (
				<>Inject Users Here</>
				// users
				/* <UserCard
					aspectRatio="horizontal"
					key={} 
					/>
					*/
			)}
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