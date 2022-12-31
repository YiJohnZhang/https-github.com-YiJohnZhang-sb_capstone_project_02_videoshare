const express = require('express');
const router = new express.Router();

// const ContentModel = require('../models/Content');
const ContentUserModel = require('../models/Content_User_Join');
const { isLoggedIn,	isReferenceUser, isAdmin, isReferenceUserOrAdmin, isOwner } = require('./middlewareAAE');
const { validateRequestBody, validateRequestQuery } = require('./middlewareSchemaValidation');
const { stringifyRequestBodyProperties, parseResponseBodyProperties } = require('../helpers/objectStringifyAndParseHelper');

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

		const contentResult = await ContentModel.getByPK(req.params.username, req.params.contentID);

		return res.json({content: parseResponseBodyProperties(contentResult)});

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
router.get('/:username/:contentID/edit', isLoggedIn, isReferenceUser, async(req, res, nxt) => {

	try{

		const contentResult = await ContentUserModel.getByPK(req.params.username, req.params.contentID);

		return res.json({content: parseResponseBodyProperties(contentResult)});

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
router.patch('/:username/:contentID/edit', isLoggedIn, isReferenceUser, async(req, res, nxt) => {

	try{

		validateRequestBody(updateContentJOINSchema)

		const contentResult = await ContentUserModel.update(req.params.username, req.params.contentID, stringifyRequestBodyProperties(req.body));

		return res.json({content: parseResponseBodyProperties(contentResult)});

	}catch(error){
		nxt(error);
	}

});

//delete: regular: a user can hide it?
//delete: admin: delete all instances

module.exports = router;