const express = require('express');
const router = new express.Router();

// const ContentModel = require('../models/Content');
const ContentUserModel = require('../models/Content_User_Join');
const { isLoggedIn,	isReferenceUser, isAdmin, isReferenceUserOrAdmin, isOwner } = require('./middlewareAAE');
const { validateRequestBody, validateRequestQuery } = require('./middlewareSchemaValidation');
const { stringifyRequestBodyProperties, parseResponseBodyProperties } = require('../helpers/objectStringifyAndParseHelper');

const updateContentJOINSchema = require('./schemas/updateContentJOIN.schema.json');
// use isParticipatingUser for editing contract by participating users

/**	GET `/[username]/[contentID]`
 *	( input ) => { contentResult }
 *		where `input` is: ( , {  })
 *		where `contentResult` is: {  }
 *	To edit the JOIN entry.
 *	Authorization Required: None
*/
router.get('/:username/:contentID', async(req, res, nxt) => {

	try{

		const contentResult = await ContentUserModel.getByPK(req.params.username, req.params.contentID);
		

		return res.json({content: parseResponseBodyProperties(contentResult)});

	}catch(error){
		nxt(error);
	}

});

/**	GET `/[username]/[contentID]/edit`
 *	( input ) => { contentResult }
 *		where `input` is: ( , {  })
 *		where `contentResult` is: {  }
 *	To edit the join entry description.
 *	Authorization Required: isLoggedIn, isReferenceUser
*/
router.get('/:username/:contentID/edit', isLoggedIn, isReferenceUser, async(req, res, nxt) => {

	try{

		const contentResult = await ContentUserModel.getByPKPrivate(req.params.username, req.params.contentID);
		
		return res.json({content: parseResponseBodyProperties(contentResult)});

	}catch(error){
		console.log(error);
		nxt(error);
	}

});

/**	PATCH `/[username]/[contentID]/edit`
 *	( input ) => { contentResult }
 *		where `input` is: ( , {  })
 *		where `contentResult` is: {  }
 *	To edit the join entry description.
 *	Authorization Required: isLoggedIn, isReferenceUser
*/
router.patch('/:username/:contentID/edit', isLoggedIn, isReferenceUser, async(req, res, nxt) => {

	try{

		console.log(`username: ${req.params.username}, contentID: ${req.params.contentID}`)

		validateRequestBody(req.body, updateContentJOINSchema);

		const contentResult = await ContentUserModel.update(req.params.username, req.params.contentID, stringifyRequestBodyProperties(req.body));
		console.log('asdf')

		return res.json({content: parseResponseBodyProperties(contentResult)});

	}catch(error){
		console.log(error);
		nxt(error);
	}

});

//delete: regular: a user can hide it?
//delete: admin: delete all instances
/**	DELETE `/[username]/[contentID]`
 *	( input ) => { modelName }
 *		where `input` is: ( req.params.username, req.params.contentID )
 *		where `contentResult` is: {  }
 *	2022-12-30: Only Admin
 *	Authorization Required: isLoggedIn, isReferenceUserOrAdmin
 */
 router.delete('/:username/:contentID', isLoggedIn, isReferenceUserOrAdmin, async(req, res, nxt) => {

	try{

		const contentResult = await ContentModel.delete(req.params.username, req.params.contentID);

		return res.json({deleted: parseResponseBodyProperties(contentResult)});

	}catch(error){
		nxt(error);
	};
	
});

module.exports = router;