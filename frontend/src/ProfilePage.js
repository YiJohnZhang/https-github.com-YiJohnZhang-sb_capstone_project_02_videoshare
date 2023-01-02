import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import ShortCollabsAPI from './helpers/api';
import UserDetailsContext from './context/UserDetailsContext';
import UserCard from './UserCard';
import ContentCard from './ContentCard';


function ProfilePage({}){
	
	const userHandle = useParams();
	const {sessionUsername} = useContext(UserDetailsContext);

	const [userData, setUserData] = useState();

	useEffect(() => {

		async function returnUserData(){

			let userData;

			if(userHandle === sessionUsername){
				userData = await ShortCollabsAPI.getFullUserData();
					// returns hidden in progress for owner only. more time: schema design so it does for participants
			}else{
				userData = await ShortCollabsAPI.getUserData();
			}

			setUserData(userData)

		}

		returnUserData();

	}, [userHandle]);


	return(
	<div className="page">
		<UserCard aspectratio="standard"
			username={userHandle}
			
			/>
		{/* todo: insert content in order
			userData.contents.map((content) => (

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