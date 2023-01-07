const request = require('supertest');

const app = require('../app');

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	user1Token, user3Token,
	adminToken
} = require('./router._testCommons.test');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const CU_CONTENT_1_PUBLIC_RESPONSE = {
	id: 1,
	title: 'test content',
	description: 'mw1',
	link: 'https://youtu.be/nhVJhRhJbJE',
	participants: ["testuser1"],
	datePublished: '2022-12-30T08:00:00.000Z'
}

const CU_CONTENT_1_PRIVATE_RESPONSE = {
	...CU_CONTENT_1_PUBLIC_RESPONSE,
	status: 'published',
	dateCreated: '2022-12-29T08:00:00.000Z',
	dateStandby: '2022-12-29T08:00:00.000Z'
}

/***	GET /cujoin/testuser1	*/
describe('GET \`/cujoin/:username/:contentID/\`', () => {

	// auth: none
	// optional req.query => {content: parseResponseBodyProperties(contentResult)}
	//	public level

	test('public', async() => {

		const response = await request(app)
			.get('/cujoin/testuser1/1')
		expect(response.body.content).toEqual(CU_CONTENT_1_PUBLIC_RESPONSE);
	
	});

	test('logged in, participant', async() => {

		const response = await request(app)
			.get('/cujoin/testuser1/1')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body.content).toEqual(CU_CONTENT_1_PUBLIC_RESPONSE);
	
	});

	test('logged in, non-participant', async() => {

		const response = await request(app)
			.get('/cujoin/testuser1/1')
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.body.content).toEqual(CU_CONTENT_1_PUBLIC_RESPONSE);
	
	});

	test('logged in, admin', async() => {

		const response = await request(app)
			.get('/cujoin/testuser1/1')
			.set('authorization', `Bearer ${adminToken}`);
		expect(response.body.content).toEqual(CU_CONTENT_1_PUBLIC_RESPONSE);
	
	});

	test('404: content not found', async() => {

		const response = await request(app)
			.get('/cujoin/testuser1/6');
		expect(response.statusCode).toEqual(404);
	
	});

});

/***	GET /:username/:contentID/edit	*/
describe('GET \`/cujoin/:username/:contentID/edit\`', () => {

	// auth: none
	// => {content: parseResponseBodyProperties(contentResult)}
	//	public level

	test('reference-user request, content1', async() => {

		const response = await request(app)
			.get('/cujoin/testuser1/1/edit')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body.content).toEqual(CU_CONTENT_1_PRIVATE_RESPONSE);
	
	});

	test('401: public request, content1', async() => {

		const response = await request(app)
			.get('/cujoin/testuser1/1/edit');
		expect(response.statusCode).toEqual(401);
	
	});

	test('401: non-reference user, content1', async() => {

		const response = await request(app)
			.get('/cujoin/testuser1/1/edit')
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.statusCode).toEqual(401);
	
	});

});

/***	PATCH /:username/:contentID/edit	*/
describe('PATCH \`/cujoin/:username/:contentID/edit\`', () => {

	// auth: isLoggedIn, isParticipatingUser
	// req.body => {content: parseResponseBodyProperties(contentResult)}
	//	private level

	test('works', async() => {

		const response = await request(app)
			.patch('/cujoin/testuser1/1/edit')
			.send({description: 'asdfffff'})
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body.content).toEqual({
			id: 1,
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

/***	UNUSED: DELETE /:username/:contentID:id */
describe('DELETE \`/cujoin/:username/:contentID\`', () => {

	test('deletes content (admin): INTEGRATION TEST', async() => {
		
		const response = await request(app)
			.delete('/cujoin/testuser1/1')
			.set('authorization', `Bearer ${adminToken}`);
		expect(response.body).toEqual({deleted: 1});
	
		const response2 = await request(app)
			.delete('/cujoin/testuser1/1')
			.set('authorization', `Bearer ${adminToken}`);
		expect(response2.statusCode).toEqual(404);

	});

	// 2022-12-30 SPECS: make it admin delete only for now.
	test('401: unauthorized (reference user)', async() => {
		
		const response = await request(app)
			.delete('/cujoin/testuser1/1')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(401);
	});

	test('401: unauthorized (non-reference user)', async() => {
		
		const response = await request(app)
			.delete('/cujoin/testuser1/1')
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.statusCode).toEqual(401);

	});

	test('401: unauthorized (public)', async() => {
		
		const response = await request(app)
			.delete('/cujoin/testuser1/1');
		expect(response.statusCode).toEqual(401);

	});
		// includes for non-existing cujoin/testuser1 (404) b/c it isn't reference user

	test('401: unauthorized (no token)', async() => {
		
		const response = await request(app)
			.delete('/cujoin/testuser1/1');
		expect(response.statusCode).toEqual(401);

	});

});