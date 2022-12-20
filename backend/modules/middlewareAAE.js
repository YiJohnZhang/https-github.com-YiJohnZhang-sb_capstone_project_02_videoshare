/**	Module for Authentication, Authorization, and (check) Existence.
 *	- Authenticate tokens.
 *	- Authorize claimed token.
 *	- Confirm an object's existence in the database.
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');
const { UnauthorizedError } = require('./utilities');

/**	Middleware: Authenticate user.
 *	If a token was provided, verify it, and, if valid, store the token payload
 *	on `res.locals`.
 *	It is not an error if no token was provided or if the token is not valid.
 */
function authenticateJWT(req, res, next) {

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
			console.log(jwt.verify(token, JWT_SECRET_KEY));
				// double check 
		}

		return next();

	} catch (err) {
		return next();
	}
	
}

/**	ensureLoggedIn(req, res, next) 
 *	Middleware to use when they must be logged in.
 *	If not, raises UnauthorizedError.
 */
function ensureLoggedIn(req, res, next) {

	try {

		if (!res.locals.user) throw new UnauthorizedError();
		return next();

	} catch(err) {
		return next(err);
	}

}

/**	isReferenceUser(req, res, nxt)
 *	Middleware to check whether or not the current user matches a modified user handle.
 *	If not, raises UnauthorizedError.
 */
function isReferenceUser(req, res, nxt) {

	// console.log(`${req.params.username}: ${res.locals.user.username}`)

	if(req.params.username === res.locals.user.username)
		return nxt();
	
	return nxt(new UnauthorizedError(`Not the user, ${req.params.username}.`));

}

/**	isAdmin(req, res, nxt)
 *	Middleware to check whether or not the user is an admin.
 *	If not, raises UnauthorizedError.
 */
function isAdmin(req, res, nxt) {

	try {

		if (res.locals.user.isAdmin)
			return nxt();
			
		return nxt(new UnauthorizedError('Not an admin!'));

	} catch(err) {
		return nxt(err);
	}

}

module.exports = {
	authenticateJWT,
	ensureLoggedIn,
	isReferenceUser,
	isAdmin
};