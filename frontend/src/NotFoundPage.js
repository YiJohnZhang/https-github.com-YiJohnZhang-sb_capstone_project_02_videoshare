import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function NotFoundPage(){

	const history = useHistory();

	function linkClickHandler(evt){

		evt.preventDefault();
		history.goBack();

	}

	return(
	<div className="page">
		<Link onClick={linkClickHandler}></Link>
	</div>
	);

}

export default NotFoundPage;