import axios from 'axios';
import { ExpressError } from './utilities';

/**	An API Class to help with API calls.
 */
class ShortCollabsAPI {

	// static BASE_URL = "https://___.herokuapp.com";
	static BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
	// static token = localStorage.getItem('jwt') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndyaWdodGdlb3JnZSIsImlzRWxldmF0ZWQiOmZhbHNlLCJpYXQiOjE2NzM3NTk0MDN9.zpSxB0Dxzgjz7BDKuCKjitvLG5-B3p0HAZKxXNUYvig";
	static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndyaWdodGdlb3JnZSIsImlzRWxldmF0ZWQiOmZhbHNlLCJpYXQiOjE2NzM3NTk0MDN9.zpSxB0Dxzgjz7BDKuCKjitvLG5-B3p0HAZKxXNUYvig";
	
	//	temporary token:
		//	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndyaWdodGdlb3JnZSIsImlzRWxldmF0ZWQiOmZhbHNlLCJpYXQiOjE2NzM3NTk0MDN9.zpSxB0Dxzgjz7BDKuCKjitvLG5-B3p0HAZKxXNUYvig
		// username: "wrightgeorge"

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
		
			const result = await axios({ url, method, data, params, headers });
			return result.data;
			
		}catch(error){

				console.error(error.response.data);
				// // console.error("API Error:", err.response);
				// let message = error.response.data.error.message;
				// throw Array.isArray(message) ? message : [message];
			
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
	/**	18	Not Used (MINIMIZE): returnAllUsers
	 *	`GET`	/users/
	 *	Users: Return all. 
	 *	Realistically this endpoint shouldn't exist(?) but just for demonstration.
	 */
	static async returnAllUsers(){

		try{

			// const response = await this.request(`users/`);
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

			const response = await this.request(`users/?username=${username}`);
			return response.users;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	getUserData(reqParam)
	 *	`GET`	/users/:userHandle/public
	 *	Users: Return user profile data (public).
	 */
	static async getUserData(username){

		try{

			const response = await this.request(`users/${username}/public`);
			return response.user;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	getAllUserData(reqParam)
	 *	`GET`	/users/:userHandle/private
	 *	Users: Return user profile data (private).
	 */
	static async getAllUserData(username){

		try{

			const response = await this.request(`users/${username}/private`);
			return response.user;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}
	
	}
	
	/**	getFullUserData(reqParam)
	 *	`GET`	/users/:userHandle/edit
	 *	Users: Return private user details.
	 */
	static async getFullUserData(username){

		try{

			const response = await this.request(`users/${username}/edit`);
			return response.user;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	patchUserData(reqParam, reqBody)
	 *	`PATCH`	/users/:userHandle/edit
	 *	Users: Update user details.
	 */
	static async patchUserData(username, userData){

		try{

			const response = await this.request(`users/${username}/edit`, 'patch', userData);
			return response.user;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	19	Not Used (MINIMIZE): deleteUser(reqParam)
	 *	`DELETE` /users/:userHandle
	 *	Users: Delete user. NOT ATTACHED.
	 */ 
	static async deleteUser(username){

		try{

			// const response = await this.request(`users/${username}/`, 'delete');
			// return response.user;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/*******	CONTENTS		*******/
	/**	createContent(reqBody)
	 *	`POST`	/contents/
	 *	Contents: New content (master relation).
	 */
	static async createContent(contentData){

		try{

			const response = await this.request(`contents/`, 'post', contentData);
			return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	20	Not Used (MINIMIZE): returnAllContents(reqQuery)
	 *	`GET`	/contents/
	 *	Contents: Use for admin dashboard moderation.
	 */
	static async returnAlContents(/* ... */){

		try{

			// const response = await this.request(`contents/?title=${contentTitle}`);
			// return response.contents;

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

			const response = await this.request(`contents/?title=${contentTitle}`);
			return response.contents;

		}catch(error){
			console.log(error)
			// throw new ExpressError(error.status, error.message);
		}

	}

	/**	getAllPublicContent()
	 *	`GET`	/contents/
	 *	Contents: Return all. Realistically this endpoint shouldn't exist(?) but just for demonstration.
	 */ 
	static async getAllPublicContent(){

		try{

			const response = await this.request(`contents/`);
			return response.contents;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	21	Not Used (MINIMIZE): returnContent(reqParam)
	 *	`GET`	/contents/:contentID
	 *	...deprecated by cujoin equivalent & `/random`
	 */
	static async returnContent(contentID){}

	/**	selectContent(reqParam)
	 *	`GET`	/contents/:contentID/random
	 *	Contents: Return by contentID.
	 */ 
	static async selectContent(contentID){

		try{

			const response = await this.request(`contents/${contentID}`);
			return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	getFullContentData(reqParam)
	 *	`GET`	/contents/:contentID/edit
	 *	Contents: Return private content details (master relation).
	 */ 
	static async getFullContentData(contentID){

		try{

			const response = await this.request(`contents/${contentID}/edit`);
			return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	patchContentData(reqParam, reqBody)
	 *	`PATCH`	/contents/:contentID/edit
	 *	Contents: Update content details (master relation).
	 */ 
	static async patchContentData(contentID, contentData){

		try{

			const response = await this.request(`contents/${contentID}/edit`, 'patch', contentData);
			return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	14	publishContent(reqParam)
	 *	`PATCH`	/contents/:contentID/publish
	 *	Contents: Update content details (master relation).
	 */ 
	static async publishContent(contentID){

		try{

			const response = await this.request(`contents/${contentID}/publish`, 'patch',);
			return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	22	Not Used (MINIMIZE): signContent(reqParams)
	 *	`PATCH`	
	 */
	static async signContent(/* ... */){}

	/**	23	Not Used (MINIMIZE): updateContent(reqParams, reqBody)
	 *	`PATCH`	
	 */
	static async updateContent(/* ... */){}

	/**	24	Not Used (MINIMIZE): deleteContent(reqParams)
	 *	`DELETE`	/contents/:contentID
	 *	Content: Delete content.
	 */ 
	static async deleteContent(contentID){

		try{

			// const response = await this.request(`contents/${contentID}/`, 'delete');
			// return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/*******	CONTENTS_USERS_JOIN		*******/
	/**	15	getJoinContentPublicData(reqParams)
	 *	`GET`	/cujoin/:userHandle/:contentID
	 *	cuJoin: get publicly displayed data.
	 */ 
	static async getContentData(username, contentID){

		try{

			const response = await this.request(`cujoin/${username}/${contentID}`)
			return response.cuJoin;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}
	
	/**	16	getJoinContentPrivateData(reqParams)
	 *	`GET`	/cujoin/:userHandle/:contentID/edit
	 *	cuJoin: get privately displayed data.
	 */ 
	static async getJoinContentData(username, contentID){

		try{

			const response = await this.request(`cujoin/${username}/${contentID}/edit`);
			// consider a private & public route
			return response.cuJoin;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}
	
	/**	17	patchJoinContent(reqParams, reqBody)
	 *	`PATCH`	/cujoin/:userHandle/:contentID/edit
	 *	cuJoin: patch the join content data.
	 */ 
	static async patchJoinContent(username, contentID, contentData){

		try{

			const response = await this.request(`cujoin/${username}/${contentID}/edit`, 'patch', contentData);
			return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

	/**	25	Not Used (MINIMIZE): deleteContent(reqParams)
	 *	`DELETE`	/cujoin/${username}/${contentID}/
	 *	cuJoin: Delete content join. NOT IMPLEMENTED because how to restore?.
	 */ 
	static async deleteContent(username, contentID){

		try{

			// const response = await this.request(`cujoin/${username}/${contentID}/`, 'delete');
			// return response.content;

		}catch(error){
			throw new ExpressError(error.status, error.message);
		}

	}

}

export default ShortCollabsAPI;
