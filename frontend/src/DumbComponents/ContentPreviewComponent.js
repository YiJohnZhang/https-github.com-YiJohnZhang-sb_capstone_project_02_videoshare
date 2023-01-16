import { Link } from 'react-router-dom';

import './ContentPreviewComponent.css';

const ContentPreviewComponent = ({ contentTitle, contentLink, isFullSize = false, contentID }) => (

	<div className={`contentCardImageContainer ContentPreviewComponent ${isFullSize ? 'fullsizeContentPreviewComponent' : 'reducedsizeComponentPreviewComponent'}`}>

		{/* todo: format contentCardImageContainer for fullSize*/}

		{isFullSize ?
		(<a href={`https://www.youtube.com/watch?v=${contentLink}`} target="_blank" rel="noopener noreferrer">
			<img src={`/content_imgs/${contentLink}.png`} alt={contentTitle}/>
			{/* getting from `public/` just for this app since there is no associated content db */}
		</a>) : 
		(<Link to={`/content/${contentID}`}>
			<img src={`/content_imgs/${contentLink}.png`} alt={contentTitle}/>
			{/* getting from `public/` just for this app since there is no associated content db */}
		</Link>)}
	</div>

);

export default ContentPreviewComponent;