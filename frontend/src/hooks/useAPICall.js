import { useState, useEffect } from 'react';
import ShortCollabsAPI from '../helpers/api';

/**	useAPICall
 *	A hook for calling an API with filler material while loading.
 *	2022-12-27 Notes: add an ability to update the material displayed.
 *	@param {string} endpoint - what type of endpoint is this?
 *	@param {string} [method='get'] - what is the request method?
 *	@param {object} [data] - what is the object
 *	@return {{response, error, isLoading: boolean}} - return response data, or error data, and whether or not the data is still loading. 
 */
function useAPICall(endpoint, method = 'get', data){
	// this uses the `fetch` API rather than AXIOS

	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
		// true?

	useEffect(() => {

		let endpointFunction;
		let endpointHasData = false;

		async function fetchData(endpointCallback, callbackHasData, data){

			try {

				let response;

				if(callbackHasData){
					response = await endpointCallback(data);
				}else{
					response = await endpointCallback();
				}

				const json = await response.json();
				setResponse(json);

			}catch(error){

				setError(error);

			}

			setIsLoading(false);

		}

		switch(endpoint){
			case 'signup':
				endpointFunction = ShortCollabsAPI.signup;
				endpointHasData = true;
				break;
			case 'login':
				endpointFunction = ShortCollabsAPI.login;
				endpointHasData = true;
				break;
			case '':
				break;

			default:
				break;
		}

		fetchData(endpoint, endpointHasData, data);

	}, [endpoint, data]);

	return {response, error, isLoading};

}

export default useAPICall;