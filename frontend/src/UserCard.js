import React from 'react';
import { Link } from 'react-router-dom';

function UserCard({ isProfilePage, username, firstName, lastName, picture, description }){

	return(
	<React.Component>
	<div className='usercardContainer'>
		<table>
		<tbody>
			<tr>
				<td>
					<Link to={`users/${username}`}>
						<img src={picture}></img>
					</Link>
				</td>
				<td>
					<Link to={`users/${username}`}><h4>{username}</h4></Link>
					<p>{firstName} {lastName}</p>
				</td>
			</tr>
			{isProfilePage && (<tr>
				<td>
					<td colSpan={2}>{description}</td>
				</td>
			</tr>)}
		</tbody>
		</table>
	</div>
	</React.Component>
	);

}

export default UserCard;