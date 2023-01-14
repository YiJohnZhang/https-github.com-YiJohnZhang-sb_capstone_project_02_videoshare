import React from 'react';
import { Link } from 'react-router-dom';

import './ContentCard.css';

function ContentCard({aspectRatio, contentID, title, description, link, participants, datePublished}){
	
	const participantsSet = new Set(participants);
		// if time: maybe use this for hot-linking edit

	function returnParticipiantsList(participantList, shouldReduceParticipantList=true, reducedParticipantListLength = 3){

		const particpantsWithLink = participantList.map((participant) => <Link class="inline" to={`/user/${participant}`}>{participant}</Link>);

		const participantListLength = participantList.length;

		if(shouldReduceParticipantList && participantListLength > reducedParticipantListLength){
			
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

	function returnDescription(descriptionParameter, shouldReduceDescription, truncatedDescriptionLength = 100){

		if(shouldReduceDescription)
			return description.substring(0, 101).concat(`...`);

		return descriptionParameter;

	}

	const participantsLinkList = returnParticipiantsList(participants, aspectRatio!=='tall');
	const truncatedDescription = returnDescription(description, aspectRatio!=='tall');

	return (
	<div className={`contentCard ${aspectRatio === 'tall' ? 'contentCard-tall' : 'contentCard-wide'}`}>
		<div className="contentCardImageContainer">
			<a href="" >
				{/* go to youtube. */}
				<img className="contentImage" src={`/${link}.jpg`} alt={`${title}`}></img>
				{/* just throw the image on public link */}
			</a>
		</div>
		<div>
			<h4>{title}</h4>
			<p>{truncatedDescription}</p>
			<p>{participantsLinkList.map((participantLink) => participantLink)}</p>
		</div>
		<div>

		</div>
	</div>
	);

}

export default ContentCard;