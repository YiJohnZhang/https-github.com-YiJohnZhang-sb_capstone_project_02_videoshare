import React from 'react';
import { Link } from 'react-router-dom';

import './ContentCard.css';
import ContentPreviewComponent from './ContentPreviewComponent';

function ContentCard({isProfilePage = false, contentID, title, description, link, participants, datePublished}){
	
	const participantsSet = new Set(participants);
		// if time: maybe use this for hot-linking edit

	function returnTruncatedTitle(titleParameter, shouldTruncateTitle = true, truncatedTitleLength = 20){

		if(shouldTruncateTitle && titleParameter.length > truncatedTitleLength)
			return title.substring(0, truncatedTitleLength+1-3).concat(`...`);

		return titleParameter;

	}

	function returnTruncatedDescription(descriptionParameter, shouldTruncateDescription = true, truncatedDescriptionLength = 100){

		if(shouldTruncateDescription && descriptionParameter.length > truncatedDescriptionLength)
			return description.substring(0, truncatedDescriptionLength-2).concat(`...`);

		return descriptionParameter;

	}

	function returnTruncatedParticipants(participantList = [], shouldTruncateParticipantList=true, reducedParticipantListLength = 3){
		const particpantsWithLink = participantList.map((participant) => (
			<Link className="inline" 
				key={participant}
				to={`/user/${participant}`}
				>
				@{participant}
			</Link>));

		const participantListLength = participantList.length;

		if(shouldTruncateParticipantList && participantListLength > reducedParticipantListLength){
			
			let featuredParticipantSet = new Set();
			
			while(featuredParticipantSet.size < reducedParticipantListLength){

				const randomIndex = Math.floor(Math.random())*participantListLength;
				featuredParticipantSet.add(randomIndex);

			}

			let reducedParticipantsWithLink = [];
			for(let setValue of featuredParticipantSet)
				reducedParticipantsWithLink.push(particpantsWithLink[setValue]);
			
			return reducedParticipantsWithLink;

		}


		return particpantsWithLink;

	}

	// always truncate participants & description for now
	const truncatedTitle = returnTruncatedTitle(title, isProfilePage);
	const truncatedDescription = returnTruncatedDescription(description);
	const participantsLinkList = returnTruncatedParticipants(participants);

	// const truncatedDescription = returnTruncatedDescription(description, !isProfilePage);
	// const participantsLinkList = returnTruncatedParticipants(participants, !isProfilePage);
	
	return (
	<div className={`card contentCard ${isProfilePage ? 'contentCard-tall' : 'contentCard-wide'} default-transition`}>
		<ContentPreviewComponent
				contentTitle={title}
				contentLink={link}
				contentID={contentID}/>
		<div>
			<Link to={`/content/${contentID}`}><h4>{truncatedTitle}</h4></Link>
			<p>{truncatedDescription}</p>
			<p>
				{participantsLinkList.map((participantLink, index) => (
					index === participantsLinkList.length - 1 ? participantLink : 
					(<React.Fragment key={index}>
						{participantLink}
						<span>,&nbsp;</span>
					</React.Fragment>)
				))}
			</p>
		</div>
	</div>
	);

}

export default ContentCard;