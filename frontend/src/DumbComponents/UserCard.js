import React from 'react';
import { Link } from 'react-router-dom';

import './UserCard.css';

const UserCard = ({ isProfilePage, username, firstName, lastName, picture, description }) => (
	
	<React.Fragment>
	<div className={isProfilePage ? 'userCard-tall' : 'userCard-wide'}>
		<div className="userCardImageContainer">
			<Link to={`/user/${username}`}>
				<img className="userImage" src={`/${picture}`} alt={`${username}`}></img>
				{/* throw the picture on public for now */}
			</Link>
		</div>
		<div>
			<h4><Link to={`/user/${username}`}>@{username}</Link></h4>
			<p>{firstName} {lastName}</p>			
		</div>
		{isProfilePage && (
		<div>
			<p>{description}</p>
		</div>)}
	</div>
	</React.Fragment>

);

export default UserCard;