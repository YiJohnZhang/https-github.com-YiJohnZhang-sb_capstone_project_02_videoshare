import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import ShortCollabsAPI from './helpers/api.js';
import UserDetailsContext from './context/UserDetailsContext.js'

import './NavBar.css';
import logo from './logoipsum-247.svg';

function NavBar() {

	const { sessionUsername, sessionProfilePicture } = useContext(UserDetailsContext);

	const ACTIVE_STYLE = {
		fontWeight: 'bold'
	}

	return (
	<table id="navigationTable" className='fullWidth'><tbody><tr>

	{/* group 1 (align left) */}
		<td className="navbarButton-container"><NavLink className="" exact to="/" title="ShortCollabs Home"><img src={logo} alt="logo"/></NavLink></td>

		<td id="navigationtd-message" className='fullWidth'>{!ShortCollabsAPI.BASE_URL.includes("localhost") &&
		(<React.Fragment>
			<i className="fa-solid fa-triangle-exclamation"></i>&nbsp;<strong>Warning</strong>: The front-end is hosted on <strong><a href="https://surge.sh" target="_blank" rel="noreferrer noopener">surge.sh</a> free-tier plan.</strong> From experience, the <strong>performance is unstable</strong>.
			<br/>
			Consider running it locally. <strong>Available at <a href="https://github.com/YiJohnZhang/sb_capstone_project_02_ShortCollabs" target="_blank" rel="noreferrer noopener"><i className="fa-brands fa-github"></i> ShortCollabs</a></strong>.
		</React.Fragment>		
		)}
		</td>
	{/* group 2 (align right) */}
	{/* if signed out */}
		{!sessionUsername &&
		<React.Fragment>
			<td className="navbarButton-container"><NavLink className="btn btn-outline-danger default-transition" activeStyle={ACTIVE_STYLE} to="/login">Login</NavLink></td>
			<td className="navbarButton-container"><NavLink className="btn btn-primary default-transition" activeStyle={ACTIVE_STYLE} to="/signup">Sign&nbsp;Up</NavLink></td>
		</React.Fragment>
		}
	
	{/* if signed in */}
		{sessionUsername &&
		<React.Fragment>
			<td className="navbarButton-container"><NavLink className="nav-pfp" to={`/user/${sessionUsername}`}><img src={`/user_imgs/${sessionProfilePicture}`} alt={sessionUsername} title={`Hello, ${sessionUsername}!`}/></NavLink></td>
			<td className="navbarButton-container"><NavLink className="btn btn-outline-success default-transition" activeStyle={ACTIVE_STYLE} to="/account" title="Edit Profile"><i className="fa-duotone fa-user-pen"></i></NavLink></td>
			<td className="navbarButton-container"><NavLink className="btn btn-outline-danger default-transition" activeStyle={ACTIVE_STYLE} to="/upload" title="Create Content"><i className="fa-duotone fa-video-plus"></i></NavLink></td>
			<td className="navbarButton-container"><NavLink className="btn btn-outline-dark default-transition" to="/logout" title="Logout">Logout</NavLink></td>
		</React.Fragment>
		}

	</tr></tbody></table>
	);
}

export default NavBar;