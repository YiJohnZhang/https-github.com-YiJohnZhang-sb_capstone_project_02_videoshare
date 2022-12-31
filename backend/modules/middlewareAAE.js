/**	Module for Authentication, Authorization, and (check) Existence.
 *	- Authenticate tokens.
 *	- Authorize claimed token.
 *	- Confirm an object's existence in the database.
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');
const { UnauthorizedError, ForbiddenError } = require('./utilities');

const ContentModel = require('../models/Content');
const RoleUserJoinModel = require('../models/Role_User_Join');

/**	authenticate(req, res, nxt)
 *	Middleware to authenticate a user.
 *	If a token was provided, verify it, and, if valid, store the token payload
 *	on `res.locals`.
 *	It is not an error if no token was provided or if the token is not valid.
 */
function authenticateJWT(req, res, nxt) {

	try {

		// const authenticationHeader = req.headers && req.headers.authorization;
		const authenticationHeader = req.headers.authorization;
	
		if (authenticationHeader) {
			// console.log(authenticationHeader);
			const token = authenticationHeader.replace(/^[Bb]earer /, "").trim();
			// console.log(token);
			// console.log(jwt.verify(token, JWT_SECRET_KEY));
			res.locals.user = jwt.verify(token, JWT_SECRET_KEY);
				// res.locals is passed in the request chain
			// console.log(jwt.verify(token, JWT_SECRET_KEY));
				// double check 
		}

		nxt();

	} catch (err) {
		nxt();
	}
	
}

/**	isLoggedIn(req, res, nxt) 
 *	Middleware to use when they must be logged in.
 *	If not, raises UnauthorizedError.
 */
function isLoggedIn(req, res, nxt) {

	try {

		if (!res.locals.user) throw new UnauthorizedError();
		nxt();

	} catch(err) {
		nxt(err);
	}

}

/**	isLoggedOut(req, res, nxt) 
 *	Middleware to use when they must be logged out.
 *	If not, raises UnauthorizedError.
 */
function isLoggedOut(req, res, nxt) {

	try {

		if (res.locals.user) throw new ForbiddenError();
		nxt();

	} catch(err) {
		nxt(err);
	}

}

/**	isReferenceUser(req, res, nxt)
 *	Middleware to check whether or not the current user matches a modified user handle.
 *	If not, raises UnauthorizedError.
 */
function isReferenceUser(req, res, nxt) {

	// console.log(`${req.params.username}: ${res.locals.user.username}`)

	if(req.params.username === res.locals.user.username)
		nxt();
	
	nxt(new UnauthorizedError(`Not the user, ${req.params.username}.`));

}

/**	checkAdminHelper(req, res, nxt)
 *	A helper for double authentication the user is an admin, for a database schema with specifications that it is possible.
 *
//  * ABANDONED
async function checkAdminHelper(userToken){

	const username = userToken.username;
	const ADMIN_ROLEID = 1;

	if(userToken.isElevated){
		// checking res.locals.user object is trivial compared to a db query
		
		try{
	
			const result = await RoleUserJoinModel.getByPK(username, ADMIN_ROLEID);

			if(result.roleID === ADMIN_ROLEID && result.userID === username){
				return true;
					// redundant `&&`
			}

		}catch(error){
			//	do nothing and let false be returned gracefully
		}

	}

	return false;

}*/

/**	isAdmin(req, res, nxt)
 *	Middleware to check whether or not the user is an admin.
 *	If not, raises UnauthorizedError.
 */
async function isAdmin(req, res, nxt) {

	try {

		// const isAdmin = await checkAdminHelper(res.locals.user);

		if(res.local.user.isElevated)
			nxt();
			
		nxt(new UnauthorizedError('Not an admin!'));

	} catch(err) {
		nxt(err);
	}

}

/**	isReferenceUserOrAdmin(req, res, nxt)
 *	Middleware to check whether or not the user is an admin or the reference user.
 *	If not, raises UnauthorizedError.
 */
async function isReferenceUserOrAdmin(req, res, nxt) {
	
	// console.log(!req.params.username === res.locals.user.username && !await checkAdminHelper(res.locals.user))
	// if(!req.params.username === res.locals.user.username || !await checkAdminHelper(res.locals.user))
	// if(!req.params.username === res.locals.user.username && !await checkAdminHelper(res.locals.user))
	// if(req.params.username === res.locals.user.username || res.locals.isElevated)
	// 	nxt();
	if(req.params.username != res.locals.user.username && !res.locals.user.isElevated)
		nxt(new UnauthorizedError(`Neither the user, ${req.params.username}, and/or admin`));
	
	// if(req.params.username === res.locals.user.username)
	// 	nxt();
	
	// if(res.locals.users.isElevated)
	// 	nxt();

	nxt();
	/* if(req.params.username === res.locals.user.username || await checkAdminHelper(res.locals.user))
		nxt();
	if(req.params.username === res.locals.user.username)
		nxt();
	
	if(await checkAdminHelper(res.locals.user))
		nxt();
	
	nxt(new UnauthorizedError(`Neither the user, ${req.params.username}, and/or admin`));
	*/
	
}

/**	isOwner(req, res, nxt)
 *	Middleware to check whether or not the user is the owner.
 *	If not, raises UnauthorizedError.
 */
async function isOwner(req, res, nxt) {

	let result;
	try{
		result = await ContentModel.getContentOwner(req.params.contentID);
	}catch(error){
		nxt(error);
	}

	if(res.locals.user.username === result.owner)
		nxt();

	nxt(new UnauthorizedError(`User token, \'${res.locals.user.username}\', is not the owner of the content.`))

}

/**	isParticipant(req, res, nxt)
 *	Middleware to check whether or not the user is a participant.
 *	If not, raises UnauthorizedError.
 */
async function isParticipatingUser(req, res, nxt) {

	// for editing the content (sign and stuff.)

	try{

		const result = ContentModel.getParticipants(req.params.contentID);
		const participantSet = new Set(result);
		
		if(participantSet.has(res.locals.user.username))
			nxt();

	}catch(error){
		nxt(new UnauthorizedError('not a participant'))
	}

	nxt(new UnauthorizedError('not a participant'));

}

module.exports = {
	authenticateJWT,
	isLoggedIn,
	isLoggedOut,
	isReferenceUser,
	isAdmin,
	isReferenceUserOrAdmin,
	isOwner,
	isParticipatingUser
};