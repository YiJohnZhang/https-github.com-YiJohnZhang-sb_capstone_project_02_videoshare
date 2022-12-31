import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.css';
import UserDetailsContext from './context/UserDetailsContext.js'

const ACTIVE_STYLE = {
	fontWeight: 'bold'
}

function NavBar() {

	const {sessionUsername} = useContext(UserDetailsContext);


	return (
	<table id="navigationTable" className='fullWidth'><tbody><tr>

	{/* group 1 (align left) */}
		<td className="navbarButton-container"><NavLink className="" exact activeStyle={ACTIVE_STYLE} to="/">Home</NavLink></td>

		<td className='fullWidth'></td>
	{/* group 2 (align right) */}
	{/* if signed out */}
		{!sessionUsername &&
		<React.Fragment>
			<td className="navbarButton-container"><NavLink className="btn btn-outline-danger" activeStyle={ACTIVE_STYLE} to="/login">Login</NavLink></td>
			<td className="navbarButton-container"><NavLink className="btn btn-primary" activeStyle={ACTIVE_STYLE} to="/signup">Register</NavLink></td>
		</React.Fragment>
		}
	
	{/* if signed in */}
		{sessionUsername &&
		<React.Fragment>
			<td className="navbarButton-container"><NavLink className="btn btn-outline-danger" activeStyle={ACTIVE_STYLE} to="/profile">Profile</NavLink></td>
			<td className="navbarButton-container"><NavLink className="btn btn-danger" activeStyle={ACTIVE_STYLE} to="/upload">+&nbsp;Upload</NavLink></td>
			<td className="navbarButton-container"><NavLink className="btn btn-outline-dark" to="/logout">Logout</NavLink></td>
		</React.Fragment>
		}

	</tr></tbody></table>
	);
}

export default NavBar;