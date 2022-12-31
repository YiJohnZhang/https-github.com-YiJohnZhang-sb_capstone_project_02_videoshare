import React from 'react';
import { Link } from 'react-router-dom';

function ContentCard({aspectRatio}){

	return (
	<div className={`contentCard ${aspectRatio === 'tall' ? 'contentCard-tall' : 'contentCard-wide'}`}>

	</div>
	);

}

export default ContentCard;