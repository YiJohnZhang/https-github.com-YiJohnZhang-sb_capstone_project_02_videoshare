/**	Router for application authentication.
	*/

const express = require('express');
const router = new express.Router();

const UserModel = require('../models/User');
const createTokenHelper = require('../helpers/createTokenHelper');
const { isLoggedOut } = require('../modules/middlewareAAE');
const { validateRequestBody } = require('./middlewareSchemaValidation');
const loginUserSchema = require('./schemas/loginUserAuthentication.schema.json');
const newUserSchema = require('./schemas/newUser.schema.json');

/**	POST `/login`
 *	{ username, password } => { token, username }
 *	Returns a JWT token to be used to authenticate requests.
 *	Authorization Required: isLoggedOut
*/
router.post('/login', isLoggedOut, async(req, res, nxt) => {

	try{

		validateRequestBody(req.body, loginUserSchema);

		const { username, password } = req.body;

		const userResult = await UserModel.authenticate(username, password);
		const token = createTokenHelper(userResult);
		
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
router.post('/register', isLoggedOut, async(req, res, nxt) => {

	try{
		
		validateRequestBody(req.body, newUserSchema);
		
		// if(req.body.isElevated)
		// 	delete req.body.isElevated;
			//	extra security
		
		const userResult = await UserModel.register(req.body);
		const token = createTokenHelper(userResult);
		
		return res.status(201).json({token, username: userResult.username});

	}catch(error){
		nxt(error);
	};

});

module.exports = router;