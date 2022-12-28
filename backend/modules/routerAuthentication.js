/**	Router for application authentication.
	*/

const express = require('express');
const router = new express.Router();

const UserModel = require('../models/User');
const { createToken } = require('../helpers/createTokenHelper');
const { isLoggedOut } = require('../modules/middlewareAAE');
const { validateRequestBody } = require('./middlewareSchemaValidation');
const loginUserSchema = require('./schemas/loginUserAuthentication.schema.json');
const newUserSchema = require('./schemas/newUser.schema.json');

/**	POST `/login`
 *	{ username, password } => { token, username }
 *	Returns a JWT token to be used to authenticate requests.
 *	Authorization Required: isLoggedOut
*/
router.post('/login', isLoggedOut, validateRequestBody(loginUserSchema), async(req, res, nxt) => {

	try{
		
		const { username, password } = req.body;
		const userResult = await UserModel.authenticate(username, password);
		const token = createToken(userResult);

		return res.json({token, username});

	}catch(error){
		nxt(error);
	};
	
});

/**	POST `/register`
 *	{ newUserObject } => { token, username }
 *	Registers the user and returns a JWT token to be used to authenticate requests.
 *	Authorization required: isLoggedOut
 */
router.post('/register', isLoggedOut, validateRequestBody(newUserSchema), async(req, res, nxt) => {

	try{

		if(req.body.isElevated)
			delete req.body.isElevated;
	
		const userResult = await User.register(req.body);
		const token = createToken(userResult);
		
		return res.status(201).json({token, username: userResult.username});

	}catch(error){
		nxt(error);
	};

});

module.exports = router;