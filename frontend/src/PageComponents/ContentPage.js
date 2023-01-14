import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

function ContentPage({title, description, participants link, datePublished}){
	// props in case it will be a modal?

	const history = useHistory();
	const { contentID } = useParams();
	
	useEffect(() => {

	}, [])

	// if 404: useHistory.push(/error)
	
	return (
	<div class="page">

		<div>
			<a href={`youtu.be/${link}`}>
				<img src={`/contents/${link}`} alt={title}/>
				<!-- getting from `public/` just for this app since there is no content db -->
			</a>
		</div>
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