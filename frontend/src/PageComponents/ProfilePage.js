import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ShortCollabsAPI from '../helpers/api';
import UserDetailsContext from '../context/UserDetailsContext';

import UserCard from '../DumbComponents/UserCard';
import ContentCard from '../DumbComponents/ContentCard';

function ProfilePage({}){
	
	const { userHandle } = useParams();
	const history = useHistory();
	const { sessionUsername } = useContext(UserDetailsContext);

	const [userData, setUserData] = useState({
		username: '',
		firstName: '',
		lastName: '',
		picture: '',
		description: '',
		content: []
	});
		// if time, dynamic loading

	useEffect(() => {

		async function returnUserData(){

			let userData;

			try{
			
				if(userHandle === sessionUsername){
					userData = await ShortCollabsAPI.getAllUserData(userHandle);
						// returns hidden in progress for owner only. more time: schema design so it does for participants
				}else{
					userData = await ShortCollabsAPI.getUserData(userHandle);
				}
				setUserData(userData);
			
			}catch(error){
				
				// console.error(error);
				history.push('/error')

			}
		}

		returnUserData();

	}, [userHandle]);


	return(
	<div className="page">
		<UserCard
			isProfilePage={true}
			username={userHandle}
			firstName={userData.firstName}
			lastName={userData.lastName}
			picture={userData.picture}
			description={userData.description}
			/>
		<div id="profile-content-root">
			{userData.content.map((content) => (
				<ContentCard
					isProfilePage={true}
					key={`content-${content.id}`}
					contentID={content.id}
					title={content.title}
					description={content.description}
					link={content.link}
					datePublished={content.datePublished}
					/>
			))}
		</div>
		{/* note: return content in the following order: id backwards? if more time: non-published first, then DESC date_published */}
	</div>
	);

}

export default ProfilePage;