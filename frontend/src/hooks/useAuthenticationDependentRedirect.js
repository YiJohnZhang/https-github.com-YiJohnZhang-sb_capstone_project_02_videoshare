import { useHistory } from "react-router-dom";

/**	useAuthenticationDependentRedirect
 *	A hook for client-side redirecting of pages to protect content. Also validates authentication.
 *	@param {boolean} [mustBeSignedIn = true] - default, true; does this page require the presence, absence, or doesn't care of a webtoken?
 *	@param {string} [redirectPath = '/'] - default, index; where should this page redirect to? 
 */
function useAuthenticationDependentRedirect(mustBeSignedIn = true, redirectPath = '/'){

	// sign in or signed out doesn't matter, don't add it
	// if(authenticationRequired === undefined){
	// 	return;
	// }

	const webToken = localStorage.getItem('jwt')
	const history = useHistory();

	// if the user must be signed in, and there is not webtoken
	if(mustBeSignedIn && !webToken)
		history.push('/');

	// if the user is required to be signed out and there is a webtoken
	if(!mustBeSignedIn && webToken)
		history.goBack();

}

export default useAuthenticationDependentRedirect;