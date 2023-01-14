import './ContentPreviewComponent.css';

const ContentPreviewComponent = ({ contentTitle, contentLink, isFullSize = false }) => (

	<div className={`ContentPreviewComponent ${isFullSize ? 'fullsizeContentPreviewComponent' : ''}`}>
		<a href={`youtu.be/${contentLink}`} target="_blank" rel="noopener noreferrer">
			<img src={`/contents/${contentLink}`} alt={contentTitle}/>
			{/* getting from `public/` just for this app since there is no associated content db */}
		</a>
	</div>

);

export default ContentPreviewComponent;