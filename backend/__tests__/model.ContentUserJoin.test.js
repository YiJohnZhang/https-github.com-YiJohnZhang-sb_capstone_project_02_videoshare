const ContentUserJoin = require("../models/Content_User_Join");

/*
const {
	NotFoundError,
	BadRequestError,
	UnauthorizedError,
} = require("../modules/utilities");*/
const {
	USER_1_PUBLIC_CONTENT_MODEL,
	USER_2_PUBLIC_CONTENT_MODEL,
	USER_1_ALL_CONTENT_MODEL,
	USER_2_ALL_CONTENT_MODEL
} = require('./commonTestObject._Test_Contents');
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

/*	getAllUserContent()	*/
describe('\'cujoin model\': getAllUserContent()', () => {

	test('testuser1', async() => {

		const queryResult = await ContentUserJoin.getAllUserContent('testuser1');
		expect(queryResult).toEqual(USER_1_ALL_CONTENT_MODEL);

	});

	test('user2', async() => {

		const queryResult = await ContentUserJoin.getAllUserContent('testuser2');
		expect(queryResult).toEqual(USER_2_ALL_CONTENT_MODEL);

	});

	test('adminUser1', async() => {

		const queryResult = await ContentUserJoin.getAllUserContent('adminUser1');
		expect(queryResult.length).toEqual(0);

	});


});

/*	getAllUserPublicContent()	*/
describe('\'cujoin model\': getAllUserPublicContent()', () => {

	test('testuser1', async() => {

		const queryResult = await ContentUserJoin.getAllUserPublicContent('testuser1');
		expect(queryResult).toEqual(USER_1_PUBLIC_CONTENT_MODEL);

	});

	test('testuser2', async() => {

		const queryResult = await ContentUserJoin.getAllUserPublicContent('testuser2');
		expect(queryResult).toEqual(USER_2_PUBLIC_CONTENT_MODEL);

	});

	test('adminUser1', async() => {

		const queryResult = await ContentUserJoin.getAllUserPublicContent('adminUser1');
		expect(queryResult.length).toEqual(0);

	});


});