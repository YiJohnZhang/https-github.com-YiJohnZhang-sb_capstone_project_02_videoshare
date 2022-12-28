import axios from 'axios';

// const BASE_URL = "https://___.herokuapp.com";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** An API Class to help with API calls.
 */
class ShortCollabsAPI {

	static token = localStorage.getItem('jwt');
	//	
	
	static async request(endpoint, method = "get", data = {}) {
		
		console.debug("API Call:", endpoint, data, method);

		//	set request settings
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${JoblyAPI.token}` };
		// ???
		const params = (method === "get")
			? data
			: {};

		try {
		
			return (await axios({ url, method, data, params, headers })).data;
		
		} catch (err) {

				console.error("API Error:", err.response);
				let message = err.response.data.error.message;
				throw Array.isArray(message) ? message : [message];
			
		}

	}

	// Individual API routes

	/** Register */
	static async signup(newUserData){
		
		try{

			const response = await this.request('auth/register', 'post', newUserData);
			console.log(response.token)
			console.log(response.username)
			return response;
	
		}catch(error){
			return {error};
		}
		
	}

	/** Login */
	static async login(userLoginData){

		try{

			const response = await this.request('auth/token', 'post', userLoginData);
			if(response.token){
				this.token = response.token;
			}
			return response;

		}catch(error){
			return {error};
		}

	}

	/* 
	static async businessFunction(???){

		try{

			const response = await this.
			return response;

		}catch(error){
			return {error}
		}

	}
	*/

}

export default ShortCollabsAPI;
