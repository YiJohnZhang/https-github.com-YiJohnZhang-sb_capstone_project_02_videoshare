const express = require('express');
const router = new express.Router();

const ContentModel = require('../models/Content');
const { isLoggedIn,	isReferenceUser, isAdmin, isReferenceUserOrAdmin, isOwner } = require('./middlewareAAE');
const { validateRequestBody, validateRequestQuery } = require('./middlewareSchemaValidation');
const newContentSchema = require('./schemas/newContent.schema.json');
// const queryModelSchema = require('./schemas/queryContent.schema.json');
const updateContentSchema = require('./schemas/updateContent.schema.json');
const { ExpressError, BadRequestError } = require('./utilities');


/** POST /
 *	body { input } => { contentResult }
 *		where `input` is: { req.body }
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES }
 *
 *	Authorization Required: isLoggedIn
*/
router.post('/', isLoggedIn, validateRequestBody(newContentSchema), async(req, res, nxt) => {

	try{

		// ntomjoin

		const contentResult = await ContentModel.create(req.body);

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	};
	
});

/** GET /
 *	=> { contentResult }
 *		where `contentResult` is: [{ QUERY_GENERAL_PROPERTIES }, ...]
 *	
 *	Filters:
 *	- title: content title.
 *	
 *	Authorization Required: None
*/
router.get('/', async(req, res, nxt) => {

	// validateRequestQuery(queryModelSchema)?

	// req.params
	// req.query
	// req.body
	
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

/** GET /[contentID]
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

/** PATCH /[contentID]
 *	( input ) => { contentResult }
 *		where `input` is: (req.params.contentID, { req.body })
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES }
 *	
 *	Authorization Required: isLoggedIn, isOwner
*/
router.update('/:contentID', isLoggedIn, isOwner, validateRequestBody(updateContentSchema), async(req, res, nxt) => {

	try{

		const contentResult = await ContentModel.update(req.params.contentID, req.body);

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	};
	
});

/** DELETE /[contentID]
 *	( input ) => { modelName }
 *		where `input` is: ( req.params.contentID )
 *		where `contentResult` is: {  }
 *	
 *	Authorization Required: isLoggedIn, isAdmin or isOwner (isReferenceUserOrAdmin, isOwner)
*/
router.delete('/:contentID', isLoggedIn, isReferenceUserOrAdmin, isOwner, async(req, res, nxt) => {

	try{

		const contentResult = await ContentModel.delete(req.params.contentID);

		return res.json({deleted: contentResult});

	}catch(error){
		nxt(error);
	};
	
});

/** */
/** GET /[contentID]/edit
 *	( input ) => { contentResult }
 *		where `input` is: ( , {  })
 *		where `contentResult` is: {  }
 *	Get full model details.
 *	Authorization Required: isLoggedIn, isOwner
*/
router.get('/:contentID', isLoggedIn, isOwner, async(req, res, nxt) => {

	try{

		const contentResult = await ContentModel.getByPKPrivate(req.params.contentID);

		// NOTE: if published, block this edit for now (to edit the join, it is `/users/:username/:contentID/edit`)

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	}

});

module.exports = router;