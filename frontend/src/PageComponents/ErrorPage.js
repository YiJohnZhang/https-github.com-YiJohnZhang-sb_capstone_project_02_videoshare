import React from 'react';
import { Link, /*useParams*/ } from 'react-router-dom';

import './ErrorPage.css';

function ErrorPage(){

	// const { errorCode } = useParams();

	return(
	<div id="errorPage" className="page">
		<h1>This page isn't available.</h1>
		{/* ok, so there is no easy access to the history entry details */}
		<p>The previously requested page may be broken, blocked, or deleted.</p>
		<p>Go <Link to="/">home</Link>.</p>
	</div>
	);

}

export default ErrorPage;