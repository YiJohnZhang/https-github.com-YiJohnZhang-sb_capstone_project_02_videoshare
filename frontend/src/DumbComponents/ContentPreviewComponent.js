import './ContentPreviewComponent.css';

const ContentPreviewComponent = ({ contentTitle, contentLink, isFullSize = false }) => (

	<div className={`contentCardImageContainer ContentPreviewComponent ${isFullSize ? 'fullsizeContentPreviewComponent' : ''}`}>

		{/* todo: format contentCardImageContainer for fullSize*/}

		<a href={`https://www.youtube.com/watch?v=${contentLink}`} target="_blank" rel="noopener noreferrer">
			<img src={`/content_imgs/${contentLink}.png`} alt={contentTitle}/>
			{/* getting from `public/` just for this app since there is no associated content db */}
		</a>
	</div>

);

export default ContentPreviewComponent;