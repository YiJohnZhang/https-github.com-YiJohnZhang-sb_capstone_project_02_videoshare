/**	Module for middleware that validates a JSON request with its corresponding schema.
	*/

const jsonschema = require('jsonschema');
const { BadRequestError } = require('./utilities');

function validateRequestBody(requestBody, expectedSchema){

	const schemaValidationResult = jsonschema.validate(requestBody, expectedSchema);

	if(schemaValidationResult.valid)
		return;
	
	const schemaErrorList = schemaValidationResult.errors.map((error) => error.stack);
	throw new BadRequestError(schemaErrorList);

}

function validateRequestQuery (requestQuery, expectedSchema){

	const schemaValidationResult = jsonschema.validate(requestQuery, expectedSchema);

	if(schemaValidationResult.valid)
		return nxt();

	const schemaErrorList = schemaValidationResult.errors.map((error) => error.stack);
	throw new BadRequestError(schemaErrorList);

}

module.exports = {
	validateRequestBody,
	validateRequestQuery
}