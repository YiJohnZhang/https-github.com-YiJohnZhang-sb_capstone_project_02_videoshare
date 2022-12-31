const express = require('express');
const router = new express.Router();

const ContentModel = require('../models/Content');
const { isLoggedIn,	isReferenceUser, isAdmin, isReferenceUserOrAdmin, isOwner, isParticipatingUser } = require('./middlewareAAE');
const { validateRequestBody, validateRequestQuery } = require('./middlewareSchemaValidation');
const newContentSchema = require('./schemas/newContent.schema.json');
// const queryModelSchema = require('./schemas/queryContent.schema.json');
const updateContentSchema = require('./schemas/updateContent.schema.json');
const updateContentJOINSchema = require('./schemas/updateContentJOIN.schema.json');

/** POST `/`
 *	{ input } => { contentResult }
 *		where `input` is: { req.body }
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES }
 *	this creates one entry.
 *	Authorization Required: isLoggedIn
*/
router.post('/', isLoggedIn, async(req, res, nxt) => {

	try{

		validateRequestBody(req.body, newContentSchema);

		const contentResult = await ContentModel.create(req.body);

		return res.status(201).json({content: contentResult});

	}catch(error){
		nxt(error);
	};
	
});

/** GET `/`
 *	=> { contentResult }
 *		where `contentResult` is: [{ QUERY_GENERAL_PROPERTIES }, ...]
 *	
 *	Filters:
 *	- title: content title.
 *	
 *	Authorization Required: None
*/
router.get('/', async(req, res, nxt) => {

	try{
		
		const contentResults = await ContentModel.getAll(req.query);
			// tod: note add JOIN query to return list of users, throw it under "contents"

		return res.json({contents: contentResults});

	}catch(error){
		nxt(error);
	}

});

/** GET `/[contentID]`
 *	=> { contentResult }
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES }
 *	
 *	Authorization Required: None
*/
router.get('/:contentID', async(req, res, nxt) => {

	try{
		
		const contentResult = await ContentModel.getByPK(req.params.contentID);
			// todo: add JOIN query to return list users

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	}

});


/** GET `/[contentID]/edit`
 *	( input ) => { contentResult }
 *		where `input` is: (req.params.contentID, { req.body })
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES, QUERY_PRIVATE_PROPERTIES }
 *	
 *	Authorization Required: isLoggedIn, isParticipatingUser
*/
router.get('/:contentID/edit', isLoggedIn, isParticipatingUser, async(req, res, nxt) => {

	try{
		
		const contentResult = await ContentModel.getByPK(req.params.contentID);
			// todo: add JOIN query to return list users

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	}

});

/** PATCH `/[contentID]/edit`
 *	( input ) => { contentResult }
 *		where `input` is: (req.params.contentID, { req.body })
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES, QUERY_PRIVATE_PROPERTIES }
 *	
 *	Authorization Required: isLoggedIn, isParticipatingUser
*/
router.patch('/:contentID/edit', isLoggedIn, isParticipatingUser, async(req, res, nxt) => {
	
	// this used to be an isOwner route
	// isParticipatingUser returns false if the status is 'active' or 'legacy'

	try{

		validateRequestBody(req.body, updateContentSchema)
	
		const contentResult = await ContentModel.update(req.params.contentID, req.body);
			// todo: disable if the current status is pbulished or legacy'
		
		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	};
	
});

/** PATCH `/[contentID]/sign`
 *	( input ) => { contentResult }
 *		where `input` is: (req.params.contentID, { req.body })
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES, QUERY_PRIVATE_PROPERTIES }
 *	
 *	Authorization Required: isLoggedIn, isReferenceUser, isParticipatingUser
*/
router.patch('/:contentID/:username/sign', isLoggedIn, isReferenceUser, isParticipatingUser, async(req, res, nxt) => {

	try{

		validateRequestBody(req.body, updateContentSchema)
			// to do: modified schema
		
		const contentResult = await ContentModel.signUpdate(req.params.contentID, req.params.username);
			// todo: disable if the current status is pbulished or legacy'
			// also, whenever contractDetails change, automatically reset 'contractSigned to `[]`'
		
		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	};
	
});

/** PATCH `/[contentID]/publish`
 *	( input ) => { contentResult }
 *		where `input` is: (req.params.contentID, { req.body })
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES, QUERY_PRIVATE_PROPERTIES }
 *	
 *	Authorization Required: isLoggedIn, isReferenceUser, isOwner
*/
router.patch('/:contentID/:username/publish', isLoggedIn, isReferenceUser, isOwner, async(req, res, nxt) => {

	try{

		validateRequestBody(req.body, updateContentSchema)
			// to do: modified schema
		
		const contentResult = await ContentModel.publishUpdate(req.params.contentID);
			// todo: disable if the current status is pbulished or legacy'
			// also, whenever contractDetails change, automatically reset 'contractSigned to `[]`'
		
		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	};
	
});

/* out of scope of project
router.patch('/:contentID/update', isLoggedIn, isAdmin, async(req, res, nxt) => {
	// todo: isParticipatingUser returns false if the status is 'active' or 'legacy'

	try{

		validateRequestBody(req.body, updateContentSchema)
			//todo modified schema (only update status available)
	
		const contentResult = await ContentModel.update(req.params.contentID, req.body, true);
			// isElevated = true => the status can be toggled
			// also can be hidden, but allow very little changes

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	};
	
});
*/

/** DELETE `/[contentID]`
 *	( input ) => { modelName }
 *		where `input` is: ( req.params.contentID )
 *		where `contentResult` is: {  }
 *	2022-12-30: Only Admin
 *	Authorization Required: isLoggedIn, isAdmin
 */
router.delete('/:contentID', isLoggedIn, isAdmin, async(req, res, nxt) => {

	try{

		const contentResult = await ContentModel.delete(req.params.contentID);

		return res.json({deleted: contentResult});

	}catch(error){
		nxt(error);
	};
	
});

/** */
/** GET `/[contentID]/edit`
 *	( input ) => { contentResult }
 *		where `input` is: ( , {  })
 *		where `contentResult` is: {  }
 *	To edit the content.
 *	Authorization Required: isLoggedIn, isOwner
*/
router.get('/:contentID/edit', isLoggedIn, isOwner, async(req, res, nxt) => {

	try{

		const contentResult = await ContentModel.getByPKPrivate(req.params.contentID);

		// NOTE: if published, block this edit for now (to edit the join, it is `/users/:username/:contentID/edit`)

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	}

});

router.get('/:contentID/:username/sign', isLoggedIn, isReferenceUser, isParticipatingUser, async(req, res, nxt) => {

	try{

		const contentResult = await ContentModel.getByPKPrivate(req.params.contentID, req.params.username);
			// NOTE: if published, block this edit for now (to edit the join, it is `/users/:username/:contentID/edit`)
			// all this returns is contractType `participatingusers`, `contractDetails`, `contractSigned`

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	}

});

module.exports = router;