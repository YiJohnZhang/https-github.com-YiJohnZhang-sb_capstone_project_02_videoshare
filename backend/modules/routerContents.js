const db = require('../database/db');
const express = require('express');
const router = new express.Router();

const ContentModel = require('../models/Content');
const { isLoggedIn,	isReferenceUser, isAdmin, isReferenceUserOrAdmin, isOwner, isParticipatingUser } = require('./middlewareAAE');
const { validateRequestBody, validateRequestQuery } = require('./middlewareSchemaValidation');
const { stringifyRequestBodyProperties, parseResponseBodyProperties } = require('../helpers/objectStringifyAndParseHelper');

const newContentSchema = require('./schemas/content.new.schema.json');
// const queryModelSchema = require('./schemas/queryContent.schema.json');
const updateContentSchema_generalEdit = require('./schemas/content.update.schema.json');
const updateContentSchema_publish = require('./schemas/content.update.schema.json');
const updateContentSchema_statusEdit = require('./schemas/content.updateTypeAdmin.schema.json');
	// not implemented but paairs with `~/content

/**	POST `/`
 *	{ input } => { contentResult }
 *		where `input` is: { req.body }
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES }
 *	this creates one entry.
 *	Authorization Required: isLoggedIn
*/
router.post('/', isLoggedIn, async(req, res, nxt) => {

	try{

		validateRequestBody(req.body, newContentSchema);

		const contentResult = await ContentModel.create(stringifyRequestBodyProperties(req.body));

		return res.status(201).json({content: parseResponseBodyProperties(contentResult)});

	}catch(error){
		// console.log(error);
		nxt(error);
	};
	
});

/**	GET `/`
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
		
		const contentResults = await ContentModel.getAllPublic(req.query);

		const parsedContentResults = contentResults.map((contentResult) => parseResponseBodyProperties(contentResult));
		return res.json({contents: parsedContentResults});

	}catch(error){
		nxt(error);
	}

});

/**	GET `/[contentID]`
 *	=> { contentResult }
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES }
 *	
 *	Authorization Required: None
*/
router.get('/:contentID', async(req, res, nxt) => {

	try{
		
		const contentResult = await ContentModel.getByPK(req.params.contentID);
			// todo: add JOIN query to return list users?

		return res.json({content: parseResponseBodyProperties(contentResult)});

	}catch(error){
		nxt(error);
	}

});

/**	GET `/[contentID]/random`
 *	=> { username, contentID }
 *	
 *	Authorization Required: None
 */
 router.get('/:contentID/random', async(req, res, nxt) => {

	try{

		const result = await ContentModel.getParticipants(req.params.contentID);

		const { participants } = result;
		const participantsArray = JSON.parse(participants);
	
		if(participantsArray.length === 1){
		
			return res.json({ username: participantsArray[0] });
				// this is an instance where it is helpful to walk away and then comeback... or work when you had more sleep.
		
		}
	
		const randomIndex = Math.floor(Math.random()*participantsArray.length);
		return res.json({ username: participantsArray[randomIndex] });

	}catch(error){
		// console.log(error);
		nxt(error);
	}

	// interesting: if this is here, even though it executes `nxt(error)`, it will execute this body too...
	// const result = await ContentModel.getParticipants(req.params.contentID);

	// const { participants } = result;
	// const participantsArray = JSON.parse(participants);

	// if(participantsArray.length === 1){
	
	// 	return res.json({ username: participantsArray[0] });
	// 		// this is an instance where it is helpful to walk away and then comeback... or work when you had more sleep.
	
	// }

	// const randomIndex = Math.floor(Math.random()*participantsArray.length);
	// return res.json({ username: participantsArray[randomIndex] });

});

/**	GET `/[contentID]/edit`
 *	( input ) => { contentResult }
 *		where `input` is: (req.params.contentID, { req.body })
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES, QUERY_PRIVATE_PROPERTIES }
 *	
 *	Authorization Required: isLoggedIn, isParticipatingUser
*/
router.get('/:contentID/edit', isLoggedIn, isParticipatingUser, async(req, res, nxt) => {
	
	try{
	
		// console.log(`heardersSent (\'routerContents.js\': ~96): ${res.headersSent}`)
		// const contentResult = await ContentModel.getByPKPrivate(req.params.contentID, res);
		const contentResult = await ContentModel.getByPKPrivate(req.params.contentID);
		// console.log(`heardersSent (\'routerContents.js\': ~99): ${res.headersSent}`)
			
		return res.json({content: parseResponseBodyProperties(contentResult)});
		
	}catch(error){
			// "Cannot set headers after they are sent to the client"
		nxt(error);
	}

});

/**	PATCH `/[contentID]/edit`
 *	( input ) => { contentResult }
 *		where `input` is: (req.params.contentID, { req.body })
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES, QUERY_PRIVATE_PROPERTIES }
 *	
 *	Authorization Required: isLoggedIn, isParticipatingUser
*/
router.patch('/:contentID/edit', isLoggedIn, isParticipatingUser, async(req, res, nxt) => {

	// this used to be an isOwner route
	// disallows if status is 'active' or 'legacy'

	try{

		validateRequestBody(req.body, updateContentSchema_generalEdit);
	
		const contentResult = await ContentModel.update(req.params.contentID, stringifyRequestBodyProperties(req.body));
			// todo: disable if the current status is pbulished or legacy'

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	};
	
});

/**	PATCH `/[contentID]/publish`
 *	( input ) => { contentResult }
 *		where `input` is: (req.params.contentID, { req.body })
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES, QUERY_PRIVATE_PROPERTIES }
 *	
 *	Authorization Required: isLoggedIn, isOwner
*/
router.patch('/:contentID/publish', isLoggedIn, isOwner, async(req, res, nxt) => {

	try{

		const contentResult = await ContentModel.updatePublish(req.params.contentID);

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	};
	
});

/**	NOT IMPLEMENTED: PATCH `/[contentID]/[username]/sign`
 *	( input ) => { contentResult }
 *		where `input` is: (req.params.contentID, { req.body })
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES, QUERY_PRIVATE_PROPERTIES }
 *	
 *	Authorization Required: isLoggedIn, isReferenceUser, isParticipatingUser
*/
router.patch('/:contentID/:username/sign', isLoggedIn, isReferenceUser, isParticipatingUser, async(req, res, nxt) => {

	try{

		validateRequestBody(req.body, updateContentSchema)
			// to do: modify schema
		
		const contentResult = await ContentModel.signUpdate(req.params.contentID, req.params.username);
			// todo: disable if the current status is pbulished or legacy'
			// also, whenever contractDetails change, automatically reset 'contractSigned to `[]`'
		
		return res.json({content: parseResponseBodyProperties(contentResult)});

	}catch(error){
		nxt(error);
	};
	
});

/**	NOT USED: DELETE `/[contentID]`
 *	( input ) => { modelName }
 *		where `input` is: ( req.params.contentID )
 *		where `contentResult` is: {  }
 *	2022-12-30: Only Admin
 *	Authorization Required: isLoggedIn, isAdmin
 */
router.delete('/:contentID', isLoggedIn, isAdmin, async(req, res, nxt) => {

	try{

		const contentResult = await ContentModel.delete(req.params.contentID);

		return res.json({deleted: parseResponseBodyProperties(contentResult)});

	}catch(error){
		nxt(error);
	};
	
});

/**	*/


/**	NOT IMPLEMENTED: PATCH `/[contentID]/updateStatus`
 *	( input ) => { contentResult }
 *		where `input` is: (req.params.contentID, { req.body })
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES, QUERY_PRIVATE_PROPERTIES }
 *	
 *	Authorization Required: isLoggedIn, isAdmin
*/
/* out of scope of project; idea is the ability to change content from 'legacy' to 'active'
router.patch('/:contentID/updateStatus', isLoggedIn, isAdmin, async(req, res, nxt) => {
	// todo: isParticipatingUser returns false if the status is 'active' or 'legacy'

	try{

		validateRequestBody(req.body, updateContentSchema_statusEdit)
			//todo modified schema (only update status available)

		const { status } = req.body;
	
		const contentResult = await ContentModel.updateStatus(req.params.contentID, status);

		return res.json({content: contentResult});

	}catch(error){
		nxt(error);
	};
	
});
*/

/**	IGNORE: PATCH `/[contentID]/publish`
 *	( input ) => { contentResult }
 *		where `input` is: (req.params.contentID, { req.body })
 *		where `contentResult` is: { QUERY_GENERAL_PROPERTIES, QUERY_PRIVATE_PROPERTIES }
 *	
 *	Authorization Required: isLoggedIn, isAdmin
*/
// router.patch('/:contentID/publish', isLoggedIn, isAdmin, async(req, res, nxt) => {

// 	// this used to be an isOwner route
// 	// disallows if status is 'active' or 'legacy'; not contentowner (update isParticipating)

// 	try{

// 		validateRequestBody(req.body, updateContentSchema)
// 			//todo modified schema (only update status available)
	
// 		const contentResult = await ContentModel.update(req.params.contentID, req.body, true);
// 			// isElevated = true => the status can be toggled
// 			// also can be hidden, but allow very little changes

// 		return res.json({content: contentResult});

// 	}catch(error){
// 		nxt(error);
// 	};
	
// });

module.exports = router;