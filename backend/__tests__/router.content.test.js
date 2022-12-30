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
const content1Request = {

	
}

const content1Response = {

	
}

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


	// update state of content (open => standby)




	// update state of content (standby => open)
		// to add more users, modifying `contract_signed` // `contract_details` will automatically push it to `open` phase
		// 


	
	// cannot update state from `open` to `standby` if content there is an unsigned user (400) bad request

	// update state of content (standby => active)
		// cannot change the state if contract_signed array is not all truthy

	// disallowed: update state of content (active => standby)

	

});

/***	DELETE /contents/:id */
describe('DELETE \`/contents/:id\`', async() => {

	test('deletes user (reference user)', async() => {
		
		const response = await request(app)
			.delete('/contents/1')
			.set('authorization', `Bearer ${u1Token}`);
		expect(response.body).toEqual({deleted: 'content1'});
		
		const response2 = await request(app)
			.delete('/contents/1')
			.set('authorization', `Bearer ${u1Token}`);
		expect(response2.statusCode).toEqual(404);

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