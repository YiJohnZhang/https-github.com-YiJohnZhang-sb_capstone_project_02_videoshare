/**	Module for middleware that validates a JSON request with its corresponding schema.
	*/

const jsonschema = require('jsonschema');
const { ExpressError } = require('./utilities');

const validateRequestBody = (selectedSchema) => {

	return (req, res, nxt) => {
	
		const schemaValidationResult = jsonschema.validate(req.body, selectedSchema);

		if(schemaValidationResult.valid)
			return nxt();
		
		const schemaErrorList = schemaValidationResult.errors.map((error) => error.stack);
		const schemaError = new ExpressError(400, schemaErrorList);

		return nxt(schemaError);

	}

}

const validateRequestQuery = (requestQuery, expectedSchema) => {

	const schemaValidationResult = jsonschema.validate(requestQuery, exampleRequestSchema);

	if(schemaValidationResult.valid)
		return nxt();

	const schemaErrorList = schemaValidationResult.errors.map((error) => error.stack);
	const schemaError = new ExpressError(400, schemaErrorList);
	return nxt(schemaError);

}

module.exports = {
	validateRequestBody,
	validateRequestQuery
};