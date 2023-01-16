import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import useAuthenticationDependentRedirect from './hooks/useAuthenticationDependentRedirect';
import UserDetailsContext from './context/UserDetailsContext';

function LogoutComponent(){

	useAuthenticationDependentRedirect(true);
		// must be signed in to visit this component

	const {setSessionUsername} = useContext(UserDetailsContext);
	const history = useHistory();

	function logout(){

		setSessionUsername(undefined);
		localStorage.removeItem('jwt');
		localStorage.removeItem('sessionUsername');
		localStorage.removeItem('sessionProfilePicture');
		history.push('/');
		history.go(0);

	}

	logout();

	return null;
	
}

export default LogoutComponent;