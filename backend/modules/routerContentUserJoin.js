const express = require('express');
const router = new express.Router();

const ContentModel = require('../models/Content');
const { isLoggedIn,	isReferenceUser, isAdmin, isReferenceUserOrAdmin, isOwner } = require('./middlewareAAE');
const { validateRequestBody, validateRequestQuery } = require('./middlewareSchemaValidation');
const newContentSchema = require('./schemas/newContent.schema.json');
// const queryModelSchema = require('./schemas/queryContent.schema.json');
const updateContentSchema = require('./schemas/updateContent.schema.json');
const updateContentJOINSchema = require('./schemas/updateContentJOIN.schema.json');
// use isParticipatingUser for editing contract by participating users


/** GET `/[username]/[contentID]`
 *	( input ) => { contentResult }
 *		where `input` is: ( , {  })
 *		where `contentResult` is: {  }
 *	To edit the JOIN entry.
 *	Authorization Required: None
*/
router.get('/:username/:contentID', async(req, res, nxt) => {

	try{

		const contentResult = await ContentModel.getJOINContent(req.params.username, req.params.contentID);

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	}

});

/** GET `/[username]/[contentID]/edit`
 *	( input ) => { contentResult }
 *		where `input` is: ( , {  })
 *		where `contentResult` is: {  }
 *	To edit the join entry.
 *	Authorization Required: isLoggedIn, isReferenceUser
*/
router.get('/:username/:contentID/edit', isLoggedIn, isReferenceUser, validateRequestBody(updateContentJOINSchema), async(req, res, nxt) => {

	try{

		const contentResult = await ContentModel.updateJOINContent(req.params.username, req.params.contentID, req.body);

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	}

});

/** PATCH `/[username]/[contentID]/edit`
 *	( input ) => { contentResult }
 *		where `input` is: ( , {  })
 *		where `contentResult` is: {  }
 *	To edit the join entry.
 *	Authorization Required: isLoggedIn, isReferenceUser
*/
router.patch('/:username/:contentID/edit', isLoggedIn, isReferenceUser, validateRequestBody(updateContentJOINSchema), async(req, res, nxt) => {

	try{

		const contentResult = await ContentModel.updateJOINContent(req.params.username, req.params.contentID, req.body);

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	}

});

module.exports = router;