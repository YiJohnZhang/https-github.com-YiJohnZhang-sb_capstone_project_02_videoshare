import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './ContentCard.css';
import ContentPreviewComponent from './ContentPreviewComponent';
import UserDetailsContext from '../context/UserDetailsContext';

function ContentCard({isProfilePage = false, contentID, title, description, link, participants = [], datePublished}){
	
	const participantsSet = new Set(participants);
	const { sessionUsername } = useContext(UserDetailsContext);
		// if time: maybe use this for hot-linking edit

	function returnTruncatedTitle(titleParameter, shouldTruncateTitle = true, truncatedTitleLength = 20){

		if(shouldTruncateTitle && titleParameter && titleParameter.length > truncatedTitleLength)
			return title.substring(0, truncatedTitleLength+1-3).concat(`...`);

		return titleParameter;

	}

	function returnTruncatedDescription(descriptionParameter, shouldTruncateDescription = true, truncatedDescriptionLength = 100){

		if(shouldTruncateDescription && descriptionParameter && descriptionParameter.length > truncatedDescriptionLength)
			return description.substring(0, truncatedDescriptionLength-2).concat(`...`);

		return descriptionParameter;

	}

	function returnTruncatedParticipants(participantList = [], shouldTruncateParticipantList=true, reducedParticipantListLength = 3){

		// temporary fix: todo: RE-SEED DB AND REMOVE
		if(!participantList)
			participantList = [];

			const particpantsWithLink = participantList.map((participant) => (
			<Link className="inline" 
				key={participant}
				to={`/user/${participant}`}
				title={participant}
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

	function notImplementedLink(evt){
		evt.preventDefault();
	}

	return (
	<div className={`card contentCard ${isProfilePage ? 'contentCard-tall' : 'contentCard-wide'} default-transition`}>
		<ContentPreviewComponent
				contentTitle={title}
				contentLink={link}
				contentID={contentID}/>
		<div>
			<Link to={`/content/${contentID}`} title={title}><h4>{truncatedTitle}</h4></Link>
			{datePublished ? <p><em>{datePublished.substring(0, 10)}</em></p> : null} 
			<p title={description}>{truncatedDescription}</p>
			<p>
				{participantsLinkList.map((participantLink, index) => (
					index === participantsLinkList.length - 1 ? participantLink : 
					(<React.Fragment key={index}>
						{participantLink}
						<span>,&nbsp;</span>
					</React.Fragment>)
				))}
			</p>
			{(isProfilePage && sessionUsername && participantsSet.has(sessionUsername)) && (
			<p className="floatRight">
				<span>&nbsp;</span>
				{!datePublished && <Link className="inline btn btn-outline-primary default-transition" to={`/edit/${contentID}`} title="Edit Master Content">
					<i className="fa-duotone fa-file-pen"></i>
				</Link>}
				<span>&nbsp;</span>
				<Link className="inline btn btn-outline-success default-transition" to={`/user/${sessionUsername}/${contentID}/edit`} title="Edit Join Content">
					<i className="fa-duotone fa-pen-to-square"></i>
				</Link>
				<span>&nbsp;</span>
				<Link className="inline btn btn-outline-danger default-transition" onClick={() => notImplementedLink} title="Delete Join Content (DISABLED)">
					{/* to={} is purposefully not defined */}
					<i className="fa-duotone fa-trash"></i>
				</Link>
			</p>
			)}
		</div>
	</div>
	);

}

export default ContentCard;