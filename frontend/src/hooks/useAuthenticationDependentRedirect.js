import { useHistory } from "react-router-dom";

/**	useAuthenticationDependentRedirect
 *	A hook for client-side redirecting of pages to protect content. Also validates authentication.
 *	@param {boolean} [authenticationRequired = true] - default, true; does this page require the presence, absence, or doesn't care of a webtoken?
 *	@param {string} [redirectPath = '/'] - default, index; where should this page redirect to? 
 */
function useAuthenticationDependentRedirect(authenticationRequired = true, redirectPath = '/'){

	// sign in or signed out doesn't matter, don't add it
	// if(authenticationRequired === undefined){
	// 	return;
	// }

	const history = useHistory();

	// sign in required, go to home if not signed in
	if(authenticationRequired && !localStorage.getItem('jwt'))
		history.push('/');

	// sign out required, return to previous page if signed in
	if(authenticationRequired === false && localStorage.getItem('jwt'))
		history.goBack();

}

export default useAuthenticationDependentRedirect;