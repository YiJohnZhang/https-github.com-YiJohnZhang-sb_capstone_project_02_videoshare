/*	A helper method to create a JWT.
	*/

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function createToken(user){

	const payload = {
		username: user.username,
		is_elevated: user.is_elevated || false
	};

	return jwt.sign(payload, SECRET_KEY);

}

module.exports = createToken;