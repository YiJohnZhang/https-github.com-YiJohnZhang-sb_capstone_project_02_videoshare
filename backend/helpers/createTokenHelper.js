/*	A helper method to create a JWT.
	*/

const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');

function createTokenHelper(user){

	const payload = {
		username: user.username,
		isElevated: user.isElevated || false
	};

	return jwt.sign(payload, JWT_SECRET_KEY);

}

module.exports = createTokenHelper;