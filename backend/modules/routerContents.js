const express = require('express');
const router = new express.Router();

const ContentModel = require('../models/Content');
const { isLoggedIn,	isReferenceUser, isAdmin, isReferenceUserOrAdmin, isOwner } = require('./middlewareAAE');
const { validateRequestBody, validateRequestQuery } = require('./middlewareSchemaValidation');
const newContentSchema = require('./schemas/newContent.schema.json');
// const queryModelSchema = require('./schemas/queryContent.schema.json');
const updateContentSchema = require('./schemas/updateContent.schema.json');
const updateContentJOINSchema = require('./schemas/updateContentJOIN.schema.json');

/** POST `/`
 *	{ input } => { contentResult }
 *		where `input` is: { req.body }
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES }
 *
 *	Authorization Required: isLoggedIn
*/
router.post('/', isLoggedIn, async(req, res, nxt) => {

	try{

		validateRequestBody(req.body, newContentSchema);

		// if(req.body.status)
		// ntomjoin
		// const NMJoin = 

		const contentResult = await ContentModel.create(req.body, NMJoin);

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

		let contentResults;

		if(req.query){
			contentResults = await ContentModel.getAll(req.query);
		}else{
			contentResults = await ContentModel.getAll();		
		}

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

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	}

});

/** PATCH `/[contentID]/edit`
 *	( input ) => { contentResult }
 *		where `input` is: (req.params.contentID, { req.body })
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES }
 *	
 *	Authorization Required: isLoggedIn, isOwner
*/
router.patch('/:contentID/edit', isLoggedIn, isOwner, async(req, res, nxt) => {

	try{

		validateRequestBody(req.body, updateContentSchema)
	
		const contentResult = await ContentModel.update(req.params.contentID, req.body);
		
		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	};
	
});

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

module.exports = router;