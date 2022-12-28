const express = require('express');
const router = new express.Router();

const { /*create, getAll, getByPK, getByPKPrivate, update, delete*/ } = require('../models/...');
const { ensureLoggedIn,	isReferenceUser, isAdmin, isReferenceUserOrAdmin } = require('./middlewareAAE');
const { validateRequestBody, validateRequestQuery } = require('./middlewareSchemaValidation');
const { ExpressError, BadRequestError } = require('./utilities');

// add `isOwner` in `middlewareAAE`

router.get('/', , async(req, res, nxt) => {

	try{

		const modelName = await getAll();

		return res.json({});

	}catch(error){
		nxt(error);
	}

});

router.get('/:pk', , async(req, res, nxt) => {

	// req.params
	// req.query
	// req.body

	try{

		if(/* ... */){

			const modelName = await getByPK();

		}else{
			const modelName = await getByPKPrivate();
		}

		return res.json({});

	}catch(error){
		nxt(error);
	}

});

router.post('/:pk', async(req, res, nxt) => {

	try{

		const modelName = await create();

	}catch(error){
		nxt(error);
	}

	return res.json({});
	
});

router.update('/:pk', async(req, res, nxt) => {

	try{

		const modelName = await update();

	}catch(error){
		nxt(error);
	}

	return res.json({});
	
});

router.delete('/:pk', async(req, res, nxt) => {

	try{

		const modelName = await delete();

	}catch(error){
		nxt(error);
	}

	return res.json({});
	
});

module.exports = router;