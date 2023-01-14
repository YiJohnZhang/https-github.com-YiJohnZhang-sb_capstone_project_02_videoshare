import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

function ErrorPage({ errorCodeProp, errorMessage }){

	const history = useHistory();
	const { errorCode } = useParams();

	function linkClickHandler(evt){

		evt.preventDefault();
		history.push('/');

	}

	return(
	<div className="page">
		<h1>{errorCode || errorCodeProp} Error</h1>
		{errorMessage ? <p>{errorMessage}</p> : null}
		<p>Go <Link onClick={linkClickHandler}>Home</Link></p>
	</div>
	);

}

export default ErrorPage;