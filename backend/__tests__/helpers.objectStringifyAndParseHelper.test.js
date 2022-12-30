const { stringifyRequestBodyProperties, parseResponseBodyProperties } = require('../helpers/objectStringifyAndParseHelper');

let SAMPLE_REQUEST_OBJECT = {
	id: 2,
	title: 'test content2',
	description: 'mw2',
	link: 'https://youtu.be/FTvLFlNbSQQ',
	participants: ["testuser1","testuser2"],
	dateCreated: '2022-12-29',
	dateStandby: '2022-12-29',
	datePublished: '2022-12-30'
}

let SAMPLE_REQUEST_OBJECT_2 = {
	id: 221,
	title: 'test sADFDFS',
	description: 'mw2',
	link: 'https://youtu.be/FTvLFlNbSQQ',
	owner: 'testuser4',
	participants: ["testuser4","testuser1"],
	contractType:'',
	contractDetails:{views:[{username:"testuser4",share:1}], engagement:[{username:"testuser4",share:1}]},
	contractSigned:[],
	datePublished: '2022-12-30'
}

const SAMPLE_RESPONSE_OBJECT = {
	contractType: 'solo',
	participants: '["testuser1"]',
	contractDetails: '{"views":[{"username":"testuser1","share":1}],"engagement":[{"username":"testuser1","share":1}]}',
	contractSigned: '["testuser1"]',
	dateCreated: '2022-12-29',
	dateStandby: '2022-12-29',
	datePublished: '2022-12-30'
}

const SAMPLE_RESPONSE_OBJECT_2 = {
	title: 'test content2',
	summary: 'afsd',
	description: 'afsd',
	link: 'https://youtu.be/FTvLFlNbSQQ',
	status: 'published',
	owner: 'testuser1',
	contractType: 'byview',
	participants: '["testuser1","testuser2"]'
}

describe('stringifyRequestBodyProperties', () => {

	test('SAMPLE_REQUEST_OBJECT', () => {

		const result = stringifyRequestBodyProperties(SAMPLE_REQUEST_OBJECT);
		expect(result).toEqual({
			...SAMPLE_REQUEST_OBJECT,
			participants:'["testuser1","testuser2"]'
		});

		SAMPLE_REQUEST_OBJECT.participants = ["testuser1","testuser2"];
			// teardown
		
	});

	test('SAMPLE_REQUEST_OBJECT_2', () => {

		const result = stringifyRequestBodyProperties(SAMPLE_REQUEST_OBJECT_2);
		expect(result).toEqual({
			...SAMPLE_REQUEST_OBJECT_2,
			participants:'["testuser4","testuser1"]',
			contractDetails:'{"views":[{"username":"testuser4","share":1}],"engagement":[{"username":"testuser4","share":1}]}',
			contractSigned:'[]'
		});

		SAMPLE_REQUEST_OBJECT_2.participants = ["testuser4","testuser1"];
		SAMPLE_REQUEST_OBJECT_2.contractDetails ={views:[{username:"testuser4",share:1}], engagement:[{username:"testuser4",share:1}]};
		SAMPLE_REQUEST_OBJECT_2.contractSigned = [];
			// teardown

	});

});

describe('parseResponseBodyProperties', () => {

	test('SAMPLE_RESPONSE_OBJECT', () => {

		const result = parseResponseBodyProperties(SAMPLE_RESPONSE_OBJECT);
		expect(result).toEqual({
			...SAMPLE_RESPONSE_OBJECT,
			participants: ["testuser1"],
			contractDetails: {views:[{username:"testuser1",share:1}], engagement:[{username:"testuser1",share:1}]},
			contractSigned: ["testuser1"]
		});

	});

	test('SAMPLE_RESPONSE_OBJECT_2', () => {

		const result = parseResponseBodyProperties(SAMPLE_RESPONSE_OBJECT_2);
		expect(result).toEqual({
			...SAMPLE_RESPONSE_OBJECT_2,
			participants: ["testuser1","testuser2"]
		});

	});

});

describe('circular', () => {

	test('SAMPLE_REQUEST_OBJECT', () => {

		console.log(SAMPLE_REQUEST_OBJECT)
		const stringified = stringifyRequestBodyProperties(SAMPLE_REQUEST_OBJECT);
		expect(stringified).toEqual({
			...SAMPLE_REQUEST_OBJECT,
			participants:'["testuser1","testuser2"]'
		});

		const parsed = parseResponseBodyProperties(stringified);
		expect(parsed).toEqual(SAMPLE_REQUEST_OBJECT);
		expect(parsed.participants).toEqual(["testuser1","testuser2"]);

	});

	test('SAMPLE_REQUEST_OBJECT_2', () => {

		const stringified = stringifyRequestBodyProperties(SAMPLE_REQUEST_OBJECT_2);
		expect(stringified).toEqual({
			...SAMPLE_REQUEST_OBJECT_2,
			participants:'["testuser4","testuser1"]',
			contractDetails:'{"views":[{"username":"testuser4","share":1}],"engagement":[{"username":"testuser4","share":1}]}',
			contractSigned:'[]'
		});

		const parsed = parseResponseBodyProperties(stringified);
		expect(parsed).toEqual(SAMPLE_REQUEST_OBJECT_2);
		expect(parsed.participants).toEqual(["testuser4","testuser1"]);

	});

});