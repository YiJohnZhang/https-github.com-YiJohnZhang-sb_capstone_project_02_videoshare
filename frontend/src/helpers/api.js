import axios from 'axios';
import { ExpressError } from './utilities';

/**	An API Class to help with API calls.
 */
class ShortCollabsAPI {

	// static BASE_URL = "https://___.herokuapp.com";
	static BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
	static token = localStorage.getItem('jwt');
	//	temporary token:
		//	
	
	static async request(endpoint, method="get", data={}) {
		
		// console.debug("API Call:", endpoint, method, data);

		//	set request settings
		const url = `${this.BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${ShortCollabsAPI.token}` };
		const params = (method==="get")
			? data
			: {};
			// set params

		try{
		
			return (await axios({ url, method, data, params, headers })).data;
		
		}catch(err){

				console.error("API Error:", err.response);
				let message = err.response.data.error.message;
				throw Array.isArray(message) ? message : [message];
			
		}

	}

	// Individual API routes

	/**	authenticateUser(reqBody)
	 *	`POST`	/authentication/token
	 */
	static async authenticateUser(userLoginData){

		try{

			const response = await this.request('authentication/login', 'post', userLoginData);
			if(response.token){
				this.token = response.token;
			}
			return response;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	registerUser(reqBody)
 	 *	`POST`	/authentication/register
 	 *	Register a user.
 	 */
	static async registerUser(newUserData){
		
		try{

			const response = await this.request('authentication/register', 'post', newUserData);
			console.log(response.token)
			console.log(response.username)
			if(response.token){
				this.token = response.token;
			}
			return response;
	
		}catch(error){
			throw new ExpressError(error.status, error.message);
		}
		
	}

	/*******	USERS		*******/
	/**	Not Used (MINIMIZE): returnAllUsers
	 *	`GET`	/users/
	 *	Users: Return all. 
	 *	Realistically this endpoint shouldn't exist(?) but just for demonstration.
	 */
	static async returnAllUsers(){

		try{

			// const response = await this.request(`/users/`);
			// return response.users;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}
	
	/**	searchUsers()
	 *	`GET`	/users/
	 *	Users: Search.
	 */
	static async searchUsers(username){

		try{

			const response = await this.request(`/users/?username=${username}`);
			return response.users;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	getUserData(reqParam)
	 *	`GET`	/user/:userHandle/public
	 *	Users: Return user profile data (public).
	 */
	static async getUserData(username){

		try{

			const response = await this.request(`/users/${username}/public`);
			return response.user;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}


	/**	getAllUserData(reqParam)
	 *	`GET`	/user/:userHandle/private
	 *	Users: Return user profile data (private).
	 */
	static async getAllUserData(username){

		try{

			const response = await this.request(`/users/${username}/private`);
			return response.user;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}
	
	}
	
	/**	getFullUserData(reqParam)
	 *	`GET`	/user/:userHandle/edit
	 *	Users: Return private user details.
	 */
	static async getFullUserData(username){

		try{

			const response = await this.request(`/users/${username}/edit`);
			return response.user;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	patchUser(reqParam, reqBody)
	 *	`PATCH`	/user/:userHandle/edit
	 *	Users: Update user details.
	 */
	static async patchUser(username, userData){

		try{

			const response = await this.request(`/users/${username}/edit`, 'patch', userData);
			return response.user;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	Not Used (MINIMIZE): deleteUser(reqParam)
	 *	`DELETE` /user/:userHandle
	 *	Users: Delete user. NOT ATTACHED.
	 */ 
	static async deleteUser(username){

		try{

			// const response = await this.request(`/users/${username}/`, 'delete');
			// return response.user;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/*******	CONTENTS		*******/
	/**	createContent(reqBody)
	 *	`POST`	/content/
	 *	Contents: New content (master relation).
	 */
	static async createContent(contentData){

		try{

			const response = await this.request(`/contents/`, 'post', contentData);
			return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	searchPublicContent(reqQuery)
	 *	`GET`	/contents/
	 *	Contents: Search.
	 */
	static async searchPublicContent(contentTitle){

		try{

			const response = await this.request(`/contents/?title=${contentTitle}`);
			return response.contents;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	getAllPublicContent()
	 *	`GET`	/contents/
	 *	Contents: Return all. Realistically this endpoint shouldn't exist(?) but just for demonstration.
	 */ 
	static async getAllPublicContent(){

		try{

			const response = await this.request(`/contents/`);
			return response.contents;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}
	/**	selectContent(reqParam)
	 *	`GET`	/content/:contentID/random
	 *	Contents: Return by contentID.
	 */ 
	static async selectContent(contentID){

		try{

			const response = await this.request(`/contents/${contentID}`);
			return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	getFullContentData(reqParam)
	 *	`GET`	/content/:contentID/edit
	 *	Contents: Return private content details (master relation).
	 */ 
	static async getFullContentData(contentID){

		try{

			const response = await this.request(`/contents/${contentID}/edit`);
			return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	patchContent(reqParam, reqBody)
	 *	`PATCH`	/content/:contentID/edit
	 *	Contents: Update content details (master relation).
	 */ 
	static async patchContent(contentID, contentData){

		try{

			const response = await this.request(`/contents/${contentID}/edit`, 'patch', contentData);
			return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	14	publishContent(reqParam)
	 *	`PATCH`	/content/:contentID/publish
	 *	Contents: Update content details (master relation).
	 */ 
	static async publishContent(contentID){

		try{

			const response = await this.request(`/contents/${contentID}/publish`, 'patch',);
			return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	22	Not Used (MINIMIZE): 
	 *	
	 */

	/**	23	Not Used (MINIMIZE): 
	 *	
	 */

	/**	24	Not Used (MINIMIZE): deleteContent(reqParam)
	 *	`DELETE`	/content/:contentID
	 *	Content: Delete content.
	 */ 
	static async deleteContent(contentID){

		try{

			// const response = await this.request(`/contents/${contentID}/`, 'delete');
			// return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/*******	CONTENTS_USERS_JOIN		*******/
	/**	cu_join (ContentJoin):	Get. I imagine sending more information to this route is a way to count engagement. 2022-12-30 Note: using `cuJoin` placeholder.*/
	static async getJoinContentData(contentID, username){

		try{

			const response = await this.request(`/contents/${contentID}/${username}`, 'get');
			return response.cuJoin;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}
	
	/**	*/ 
	static async patchJoinContent(contentID, username, contentData){

		try{

			const response = await this.request('/users/')
			return response.property;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}
	
	/** cu_join	(ContentJoin): Delete content join. NOT IMPLEMENTED because how to restore?.*/ 
	static async deleteContent(contentID){

		try{

			const response = await this.request(`/contents/${contentID}/`, 'delete');
			return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

}

export default ShortCollabsAPI;
