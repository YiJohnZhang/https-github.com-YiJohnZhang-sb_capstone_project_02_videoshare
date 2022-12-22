const request = require('supertest');

const app = require('../app');

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	u1Token,
	adminUserToken
} = require('./router._testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/***	POST /contents */
describe('POST \`/contents\`: create', async() => {

	// 

});

/***	GET /contents */
describe('GET \`/contents\`: search', async() => {

	// 

});

/***	GET /contents/:id */
describe('GET \`/contents/:id\`', async() => {

	// 

});

/***	PATCH /contents/:id */
describe('PATCH \`/contents/:id\`', async() => {

	let patchedContentResponseObject = content1ReferenceResponse;
	// patchedContentResponseObject.property = 'af';
	// 

	

});

/***	DELETE /contents/:id */
describe('DELETE \`/contents/:id\`', async() => {

	test('deletes user (reference user)', async() => {
		
		const response = await request(app)
			.delete('/contents/1')
			.set('authorization', `Bearer ${u1Token}`);
		expect(response.body).toEqual({deleted: 'content1'});
		
		const response = await request(app)
			.delete('/contents/1')
			.set('authorization', `Bearer ${u1Token}`);
		expect(response.statusCode).toEqual(404);

	});

	test('deletes user (admin)', async() => {
		
		const response = await request(app)
			.delete('/contents/1')
			.set('authorization', `Bearer ${adminUserToken}`);
		expect(response.body).toEqual({deleted: 'content1'});
	
	});

	test('403 error: unauthorized (wrong user)', async() => {
		
		const response = await request(app)
			.delete('/contents/1')
			.set('authorization', `Bearer: ${u2Token}`);
		expect(response.statusCode).toEqual(403);

	});
		// includes for non-existing contents (404) b/c it isn't reference user

	test('403 error: unauthorized (no token)', async() => {
		
		const response = await request(app)
			.delete('/contents/1');
		expect(response.statusCode).toEqual(403);

	});

});