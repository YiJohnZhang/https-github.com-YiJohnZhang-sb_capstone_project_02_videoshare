import React, { useEffect } from 'react';

import './HomePage.css';

function HomePage(props){

	// make a query
	//	...

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
			<p>fsda</p>
		</div>


	{/* insert content in order */}
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