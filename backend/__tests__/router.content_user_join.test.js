const request = require('supertest');

const app = require('../app');

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	user1Token, user3Token,
	adminToken
} = require('./router._testCommons');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const CONTENT_1_RESPONSE = {
	id: 1,
	title: 'test content',
	description: 'mw1',
	link: 'https://youtu.be/nhVJhRhJbJE',
	participants: ["testuser1"],
	datePublished: '2022-12-30T08:00:00.000Z'
}

const CONTENT_1_EDIT_GET_RESPONSE = {
	id: 1,
	title: 'test content',
	description: 'mw1'
}

/***	GET /contents	*/
describe('GET \`/:username/:contentID/\`', () => {

	// auth: none
	// optional req.query => {content: parseResponseBodyProperties(contentResult)}
	//	public level

	test('public', async() => {

		const response = await request(app)
			.get('/cujoin/testuser1/1')
		expect(response.body.content).toEqual(CONTENT_1_RESPONSE);
	
	});

	test('logged in, participant', async() => {

		const response = await request(app)
			.get('/cujoin/testuser1/1')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body.content).toEqual(CONTENT_1_RESPONSE);
	
	});

	test('logged in, non-participant', async() => {

		const response = await request(app)
			.get('/cujoin/testuser1/1')
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.body.content).toEqual(CONTENT_1_RESPONSE);
	
	});

	test('logged in, admin', async() => {

		const response = await request(app)
			.get('/cujoin/testuser1/1')
			.set('authorization', `Bearer ${adminToken}`);
		expect(response.body.content).toEqual(CONTENT_1_RESPONSE);
	
	});

	test('404: content not found', async() => {

		const response = await request(app)
			.get('/cujoin/testuser1/6');
		expect(response.statusCode).toEqual(404);
	
	});

});

/***	GET /:username/:contentID/edit	*/
describe('GET \`/:username/:contentID/edit\`', () => {

	// auth: none
	// => {content: parseResponseBodyProperties(contentResult)}
	//	public level

	test('reference-user request, content1', async() => {

		const response = await request(app)
			.get('/cujoin/testuser1/1')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body.content).toEqual(CONTENT_1_EDIT_GET_RESPONSE);
	
	});

	test('401: public request, content1', async() => {

		const response = await request(app)
			.get('/cujoin/1/testuser1')
			.set('authorization', `Bearer ${user1Token}`);;
		expect(response.statusCode).toEqual(401);
	
	});

	test('401: non-reference user, content1', async() => {

		const response = await request(app)
			.get('/cujoin/1/testuser1')
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.statusCode).toEqual(401);
	
	});

});

/***	PATCH /:username/:contentID/edit	*/
describe('PATCH \`:username/:contentID/edit\`', () => {

	// auth: isLoggedIn, isParticipatingUser
	// req.body => {content: parseResponseBodyProperties(contentResult)}
	//	private level

	test('works', async() => {

		const response = await request(app)
			.patch('/cujoin/testuser1/1/edit')
			.send({description: 'asdfffff'})
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body.content).toEqual({
			...CONTENT_1_EDIT_GET_RESPONSE,
			description: 'asdfffff'
		});
	
	});

	test('401: public', async() => {

		const response = await request(app)
			.patch('/cujoin/testuser1/1/edit')
			.send({description: 'asdfffff'});
		expect(response.statusCode).toEqual(401);
	
	});

	test('401: non-reference user', async() => {

		const response = await request(app)
			.patch('/cujoin/testuser1/1/edit')
			.send({description: 'asdfffff'})
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.statusCode).toEqual(401);
	
	});

});

/***	DELETE /:username/:contentID:id */
/*	out of scope.*/