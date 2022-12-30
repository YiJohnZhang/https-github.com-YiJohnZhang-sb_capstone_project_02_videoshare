const express = require('express');
const router = new express.Router();

const UserModel = require('../models/User');
const ContentModel = require('../models/Content');
const { isLoggedIn,	isReferenceUser, isAdmin, isReferenceUserOrAdmin } = require('./middlewareAAE');
const { validateRequestBody, validateRequestQuery } = require('./middlewareSchemaValidation');

const updateUserSchema_userVariant = require('./schemas/updateUser.typeUser.schema.json');
const updateUserSchema_adminVariant = require('./schemas/updateUser.typeAdmin.schema.json');

/** GET `/`
 *	=> { userResult }
 *		where `userResult` is: [{ QUERY_GENERAL_PROPERTIES }, ...]
 *	
 *	Filters:
 *	- title: content title.
 *	
 *	Authorization Required: None
*/
router.get('/', async(req, res, nxt) => {
	
	try{

		const userResults = await UserModel.getAll(req.query);
			// by default req.query is `{}` and `{}` is truthy
		// if(req.query !== {}){
		// 	console.log(req.query)
		// 	userResults = await UserModel.getAll(req.query);
		// }else{
		// 	userResults = await UserModel.getAll(undefined);
		// 	console.log(userResults);
		// }

		return res.json({users: userResults});

	}catch(error){
		nxt(error);
	}

});

/** GET `/[username]`
 *	=> { userResult }
 *		where `userResult` is: { QUERY_GENERAL_PROPERTIES }
 *	
 *	Authorization Required: None
*/
router.get('/:username', async(req, res, nxt) => {

	try{
		
		const userResult = await UserModel.getByPK(req.params.username);
			// todo: add JOIN query to return list of users, throw it under "user"
			// user exists implied
		const correspondingContentResult = await ContentModel.getContentByUsername();
			// note: front-end queries for title, link, contract_signed (collaborators if `contract_type` is not `solo`)

		return res.json({user: userResult, content: correspondingContentResult});

	}catch(error){
		nxt(error);
	}

});

/** PATCH `/[username]/edit`
 *	( input ) => { userResult }
 *		where `input` is: (req.params.username, { req.body })
 *		where `userResult` is: { QUERY_GENERAL_PROPERTIES }
 *	
 *	Authorization Required: isLoggedIn, isReferenceUserOrAdmin
*/
router.patch('/:username/edit', isLoggedIn, isReferenceUserOrAdmin, async(req, res, nxt) => {

	try{
		
		if(res.locals.user.isElevated){
			validateRequestBody(req.body, updateUserSchema_adminVariant);
		}else{
			validateRequestBody(req.body, updateUserSchema_userVariant);
		}

		const userResult = await UserModel.update(req.params.username, req.body);

		return res.json({user: userResult});

	}catch(error){
		nxt(error);
	};
	
});

/** DELETE `/[username]`
 *	( input ) => { modelName }
 *		where `input` is: ( req.params.username )
 *		where `userResult` is: {  }
 *	
 *	Authorization Required: isLoggedIn, isReferenceUserOrAdmin
*/
router.delete('/:username', isLoggedIn, isReferenceUserOrAdmin, async(req, res, nxt) => {

	try{

		const userResult = await UserModel.delete(req.params.username);
		return res.json({deleted: userResult.username});

	}catch(error){
		nxt(error);
	};
	
});

/** */
/** GET `/[username]/edit`
 *	( input ) => { userResult }
 *		where `input` is: ( req.params.username )
 *		where `userResult` is: { QUERY_GENERAL_PROPERTIES, QUERY_PRIVATE_PROPERTIES }
 *	Get full User details.
 *	Authorization Required: isLoggedIn, isReferenceUserOrAdmin
*/
router.get('/:username/edit', isLoggedIn, isReferenceUserOrAdmin, async(req, res, nxt) => {

	try{

		const userResult = await UserModel.getByPKPrivate(req.params.username);
		return res.json({user: userResult});

	}catch(error){
		nxt(error);
	}

});

module.exports = router;