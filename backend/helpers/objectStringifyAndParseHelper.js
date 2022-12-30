/**	A helper that localizes stringifying and parsing object/JSON and array/stringifed array objects.
	*/

const PROPERTIES_TO_STRINGIFY = [
	'participants',
	'contractDetails',
	'contractSigned'
];

function stringifyRequestBodyProperties(requestBody){

	PROPERTIES_TO_STRINGIFY.forEach((property) => {

		if(requestBody[property])
			requestBody[property] = JSON.stringify(requestBody[property]);

	});

	return requestBody;

}

function parseResponseBodyProperties(responseBody){

	PROPERTIES_TO_STRINGIFY.forEach((property) => {

		if(responseBody[property])
			responseBody[property] = JSON.parse(responseBody[property]);

	});

	return responseBody;

}

module.exports = {
	stringifyRequestBodyProperties,
	parseResponseBodyProperties
};