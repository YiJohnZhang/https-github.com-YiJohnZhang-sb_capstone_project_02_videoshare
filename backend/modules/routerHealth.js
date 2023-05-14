/**	Router for application Render backend health check.
	*/

const express = require('express');
const router = new express.Router();

router.get('/', async(req, res, nxt) => {

	return res.status(200).send("OK");

});

module.exports = router;