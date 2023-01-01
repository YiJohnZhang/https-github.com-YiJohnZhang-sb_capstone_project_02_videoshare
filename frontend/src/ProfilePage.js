import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import UserDetailsContext from './context/UserDetailsContext';

import ShortCollabsAPI from './helpers/api';
import UserCard from './UserCard';
import ContentCard from './ContentCard';


function ProfilePage({}){
	
	const userHandle = useParams();
	const {sessionUsername} = useContext(UserDetailsContext);

	const [userInformation, setUserInformation] = useState();

	useEffect(() => {

		async function returnUserInformation(){

			let userData;

			if(userHandle === sessionUsername){
				userData = await ShortCollabsAPI.getUserFullInformation();
					// returns hidden in progress for owner only. more time: schema design so it does for participants
			}else{
				userData = await ShortCollabsAPI.getUserInformation();
			}

			setUserInformation(userData)

		}

		returnUserInformation();

	}, [userHandle]);


	return(
	<div className="page">
		<UserCard aspectratio="horizontal"/>
		{/* insert content in order
			userInformation.contents.map((content) => (

				<ContentCard aspectratio="vertical"
					key={`content-${content.id}`}
					id={content.id}
					title={content.title}
					description={content.description}
					link={content.link}
					datePublished={content.datePublished}
					/>
		))*/}
		{/* note: return content in the following order: id backwards? if more time: non-published first, then DESC date_published */}
	</div>
	);

}

export default ProfilePage;