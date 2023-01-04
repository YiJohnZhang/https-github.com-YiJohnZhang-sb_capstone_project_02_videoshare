const ContentUserJoin = require("../models/Content_User_Join");

const {
	NotFoundError,
	BadRequestError,
	UnauthorizedError,
} = require("../modules/utilities");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll
} = require("./model._testCommons.test.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// const dateObject = new Date;
const _2022_12_30_DATE = new Date('December 30, 2022 00:00:00');

const USER_1_PUBLIC_CONTENT = [
	{
		id: 1,
		title: 'tempContent1',
		description: 'mw1',
		link: 'invalidLink',
		participants: JSON.stringify(["testuser1"]),
		datePublished: _2022_12_30_DATE
	},
	{
		id: 2,
		title: 'tempContent2',
		description: 'mw2',
		link: 'invalidLink',
		participants: JSON.stringify(["testuser1", "testuser2"]),
		datePublished: _2022_12_30_DATE
	}
];

/*
const USER_1_ALL_CONTENT =  [
	...USER_1_PUBLIC_CONTENT,
	{
		id: 3,
		title: 'tempContent3',
		summary: 'asdfdsafa',
		description: 'afsd',
		link: '',
		participants: ["testuser1", "testuser2"],
		dateCreated: '2022-12-30',
		dateStandby: '2022-12-30',
		datePublished: null
	}
];*/

const USER_2_PUBLIC_CONTENT = [
	{
		id: 2,
		title: 'tempContent2',
		description: 'mw2',
		link: 'invalidLink',
		participants: JSON.stringify(["testuser1", "testuser2"]),
		datePublished: _2022_12_30_DATE
	}	
];

const USER_1_AND_2_PRIVATE_CONTENT_EXAMPLE = {
		id: 3,
		title: 'tempContent3',
		description: 'afsd',
		link: 'invalidLink',
		participants: JSON.stringify(["testuser1", "testuser2"]),
		datePublished: null
}

const USER_1_ALL_CONTENT =  [
	...USER_1_PUBLIC_CONTENT,
	USER_1_AND_2_PRIVATE_CONTENT_EXAMPLE
];

const USER_2_ALL_CONTENT = [
	...USER_2_PUBLIC_CONTENT,
	USER_1_AND_2_PRIVATE_CONTENT_EXAMPLE	
];

/*	getAllUserContent()	*/
describe('getAllUserContent()', () => {

	test('testuser1', async() => {

		const queryResult = await ContentUserJoin.getAllUserContent('testuser1');
		expect(queryResult).toEqual(USER_1_ALL_CONTENT);

	});

	test('user2', async() => {

		const queryResult = await ContentUserJoin.getAllUserContent('testuser2');
		expect(queryResult).toEqual(USER_2_ALL_CONTENT);

	});

	test('adminUser1', async() => {

		const queryResult = await ContentUserJoin.getAllUserContent('adminUser1');
		expect(queryResult.length).toEqual(0);

	});


});

/*	getAllUserPublicContent()	*/
describe('getAllUserPublicContent()', () => {

	test('testuser1', async() => {

		const queryResult = await ContentUserJoin.getAllUserPublicContent('testuser1');
		expect(queryResult).toEqual(USER_1_PUBLIC_CONTENT);

	});

	test('testuser2', async() => {

		const queryResult = await ContentUserJoin.getAllUserPublicContent('testuser2');
		expect(queryResult).toEqual(USER_2_PUBLIC_CONTENT);

	});

	test('adminUser1', async() => {

		const queryResult = await ContentUserJoin.getAllUserPublicContent('adminUser1');
		expect(queryResult.length).toEqual(0);

	});


});

module.exports = {
	USER_1_PUBLIC_CONTENT,
	USER_2_PUBLIC_CONTENT,
	USER_1_ALL_CONTENT,
	USER_2_ALL_CONTENT
}