const express = require('express');
const router = new express.Router();

const UserModel = require('../models/User');
const { isLoggedIn,	isReferenceUser, isAdmin, isReferenceUserOrAdmin } = require('./middlewareAAE');
const { validateRequestBody, validateRequestQuery } = require('./middlewareSchemaValidation');
const updateUserSchema = require('./schemas/updateUser.schema.json');

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

		let userResults;

		if(req.query){
			userResults = await UserModel.getAll(req.query);
		}else{
			userResults = await UserModel.getAll();		
		}

		return res.json({contents: userResults});

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
		// TODO: add content associated with user
		const userResult = await UserModel.getByPK(req.params.username);

		return res.json({content: userResult});

	}catch(error){
		nxt(error);
	}

});

/** PATCH `/[username]/edit`
 *	( input ) => { userResult }
 *		where `input` is: (req.params.username, { req.body })
 *		where `userResult` is: { QUERY_GENERAL_PROPERTIES }
 *	
 *	Authorization Required: isLoggedIn, isReferenceUser
*/
router.update('/:username/edit', isLoggedIn, isReferenceUser, validateRequestBody(updateUserSchema), async(req, res, nxt) => {

	try{
		
		const userResult = await UserModel.update(req.params.username, req.body);

		return res.json({content: userResult});

	}catch(error){
		nxt(error);
	};
	
});

/** DELETE `/[username]`
 *	( input ) => { modelName }
 *		where `input` is: ( req.params.username )
 *		where `userResult` is: {  }
 *	
 *	Authorization Required: isLoggedIn, isAdmin or isOwner (isReferenceUserOrAdmin, isOwner)
*/
router.delete('/:username', isLoggedIn, isReferenceUserOrAdmin, isOwner, async(req, res, nxt) => {

	try{

		const userResult = await UserModel.delete(req.params.username);

		return res.json({deleted: userResult});

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
 *	Authorization Required: isLoggedIn, isReferenceUser
*/
router.get('/:username/edit', isLoggedIn, isReferenceUser, async(req, res, nxt) => {

	try{

		const userResult = await UserModel.getByPKPrivate(req.params.username);

		return res.json({content: userResult});

	}catch(error){
		nxt(error);
	}

});

module.exports = router;