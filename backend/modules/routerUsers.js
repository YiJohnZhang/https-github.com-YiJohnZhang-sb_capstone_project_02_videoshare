const express = require('express');
const router = new express.Router();

const UserModel = require('../models/User');
const ContentUserJoinModel = require('../models/Content_User_Join');
const { isLoggedIn,	isReferenceUser, isAdmin, isReferenceUserOrAdmin } = require('./middlewareAAE');
const { validateRequestBody, validateRequestQuery } = require('./middlewareSchemaValidation');

const { parseResponseBodyProperties } = require('../helpers/objectStringifyAndParseHelper');
const updateUserSchema_userVariant = require('./schemas/user.updateTypeUser.schema.json');
const updateUserSchema_adminVariant = require('./schemas/user.updateTypeAdmin.schema.json');

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

		return res.json({users: userResults});

	}catch(error){
		nxt(error);
	}

});

/** GET `/[username]/public`
 *	=> { user: userResult }
 *		where `userResult` is: { QUERY_GENERAL_PROPERTIES, content: { correspondingContentResult } }
 *	
 *	Authorization Required: None
*/
router.get('/:username/public', async(req, res, nxt) => {

	try{
		
		let userResult = await UserModel.getByPK(req.params.username);

		const correspondingContentResult = await ContentUserJoinModel.getAllUserPublicContent(req.params.username);
		const parsedContentResult = correspondingContentResult.map((element) => parseResponseBodyProperties(element));
		userResult.content = parsedContentResult;

		return res.json({user: userResult});

	}catch(error){
		nxt(error);
	}

});

/** GET `/[username]/private`
 *	=> { userResult }
 *		where `userResult` is: { QUERY_GENERAL_PROPERTIES, content: { correspondingContentResult } }
 *	
 *	Authorization Required: isLoggedIn, isReferenceUser
*/
router.get('/:username/private', isLoggedIn, isReferenceUser, async(req, res, nxt) => {

	try{
		
		let userResult = await UserModel.getByPK(req.params.username);

		const correspondingContentResult = await ContentUserJoinModel.getAllUserContent(req.params.username);
		const parsedContentResult = correspondingContentResult.map((element) => parseResponseBodyProperties(element));
		userResult.content = parsedContentResult;
		
		return res.json({user: userResult});

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