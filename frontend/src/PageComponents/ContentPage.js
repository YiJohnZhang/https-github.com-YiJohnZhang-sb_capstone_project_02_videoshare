import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import ShortCollabsAPI from '../helpers/api';
import ContentPreviewComponent from '../DumbComponents/ContentPreviewComponent';

function ContentPage({title, description, participants, link, datePublished}){
	// props in case it will be a modal?

	const history = useHistory();
	const { contentID } = useParams();
	
	useEffect(() => {

	}, [])

	// if 404: useHistory.push(/error)
	
	return (
	<div class="page">
		<ContentPreviewComponent
				contentTitle={title}
				contentLink={link}
				isFullSize={true}/>
		<div>
			<h2>{title}</h2>
			<p><strong>Published On: {datePublished}</strong> {description}</p>
			<p>{participants.map((element) => (
				<React.Fragment>
					<span>&nbsp;&nbsp;</span>
					<Link to={`user/${element}`} 
						key={element}>
						@{element}
					</Link>
					<span>&nbsp;&nbsp;</span>
				</React.Fragment>
			))}</p>
		</div>
		<div>
			<p>[Insert engagement]</p>
		</div>

	</div>
	);

}

export default ContentPage;