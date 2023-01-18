const request = require('supertest');

const app = require('../app');
const {
	USER_1_PUBLIC_CONTENT_ROUTER,
	USER_2_PUBLIC_CONTENT_ROUTER,
	USER_1_ALL_CONTENT_ROUTER,
	USER_2_ALL_CONTENT_ROUTER
} = require('./commonTestObject._Test_Contents');

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

const USER1_PUBLIC_RESPONSE = {
	username: 'testuser1',
	firstName: 'Test',
	lastName: 'User1',
	verified: false,
	accountStatus: 'standby',
	picture: '',
	description: ''
}

const USER1_PRIVATE_RESPONSE = {
	username: 'testuser1',
	firstName: 'Test',
	lastName: 'User1',
	birthdate: '1990-01-01T08:00:00.000Z',
	verified: false,
	accountStatus: 'standby',
	email: 'testuser1@gmail.com',
	picture: '',
	description: ''
}

const USER3_PUBLIC_RESPONSE = {
	username: 'testuser3',
	firstName: 'Test',
	lastName: 'User3',
	verified: false,
	accountStatus: 'standby',
	picture: '',
	description: ''
}
/***	POST /users (DEPRECATED, MOVE TO `/authentication/register`)*/

/***	GET /users */
describe('GET \`/users\`: search', () => {

	test('no filter methods', async() => {

		const response = await request(app)
			.get('/users/');
		expect(response.body.users.length).toEqual(4);

	});

	test('filter method', async() => {

		const response = await request(app)
			.get('/users/')
			.query({username:'test'});
		expect(response.body.users.length).toEqual(3);

		const response2 = await request(app)
			.get('/users/')
			.query({username:'2'});
		expect(response2.body.users.length).toEqual(1);

	});

	test('with auth', async() => {

		const response1 = await request(app)
			.get('/users/')
			.query({username:'test'})
			.set('authorization', `Bearer ${user1Token}`);
		expect(response1.body.users.length).toEqual(3);

		const response2 = await request(app)
			.get('/users/')
			.query({username:'2'})
			.set('authorization', `Bearer ${user1Token}`);
		expect(response2.body.users.length).toEqual(1);

	});

});

/***	GET /users/:username/public */
describe('GET \`/users/:username/public\`', () => {

	//	being a refernce token will never triugger `/users/:username/public
	// test('public view testuser1 (reference user token)', async() => {

	// 	const response = await request(app)
	// 		.get('/users/testuser1/public')
	// 		.set('authorization', `Bearer ${user1Token}`);
	// 	expect(response.body).toEqual({
	// 		user: {...
	// 			USER1_PUBLIC_RESPONSE,
	// 			content: USER_1_PUBLIC_CONTENT_ROUTER
	// 		}
	// 	});

	// });

	test('public view testuser1 (admin token)', async() => {

		const response = await request(app)
			.get('/users/testuser1/public')
			.set('authorization', `Bearer ${adminToken}`);
		expect(response.body).toEqual({
			user: {...
				USER1_PUBLIC_RESPONSE,
				content: USER_1_PUBLIC_CONTENT_ROUTER
			}
		});

	});

	test('public view testuser1 (non-reference user token)', async() => {
		
		const response = await request(app)
			.get('/users/testuser1/public')
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.body).toEqual({
			user: {...
				USER1_PUBLIC_RESPONSE,
				content: USER_1_PUBLIC_CONTENT_ROUTER
			}
		});

	});

	test('public view (no token)', async() => {
		
		const response = await request(app)
			.get('/users/testuser1/public');
		expect(response.body).toEqual({
			user: {...
				USER1_PUBLIC_RESPONSE,
				content: USER_1_PUBLIC_CONTENT_ROUTER
			}
		});

	});

	test('404 error: user not found', async() => {

		const response = await request(app)
			.get('/users/testuser12/public');
		expect(response.statusCode).toEqual(404);

	});

	test('public view testuser3 (reference user token)', async() => {

		const response = await request(app)
			.get('/users/testuser3/public')
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.body).toEqual({
			user: {
				...USER3_PUBLIC_RESPONSE,
				content: []
			}
		});

	});

	test('public view testuser3 (non-reference user token)', async() => {

		const response = await request(app)
			.get('/users/testuser3/public')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body).toEqual({
			user: {
				...USER3_PUBLIC_RESPONSE,
				content: []
			}

		});

	});

});

/***	GET /users/:username/private */
describe('GET \`/users/:username/private\`', () => {

	test('works: testuser1 (reference user token)', async() => {

		const response = await request(app)
			.get('/users/testuser1/private')
			.set('authorization', `Bearer ${user1Token}`);
			
		// expect(response.body).toEqual({
		// 	user: {...
		// 		USER1_PUBLIC_RESPONSE,
		// 		content: USER_1_ALL_CONTENT_ROUTER
		// 	}
		// });

		const RESPONSE_USER_BODY = response.body.user;
		const { content: TEST_CONTENT } = RESPONSE_USER_BODY;
		delete RESPONSE_USER_BODY.content;

		expect(RESPONSE_USER_BODY).toEqual(USER1_PUBLIC_RESPONSE);
		expect(USER_1_ALL_CONTENT_ROUTER).toEqual(expect.arrayContaining(TEST_CONTENT));
		expect(TEST_CONTENT).toEqual(expect.arrayContaining(USER_1_ALL_CONTENT_ROUTER));
			// 2023-01-17: checking equivalence out of order rather than exact because of prioritizing `open` and `standby` content first
		
	});

	// block any forced attempts to access private (even though front-end does not permit this route)
	test('401: testuser1 (admin token attempt)', async() => {

		const response = await request(app)
			.get('/users/testuser1/private')
			.set('authorization', `Bearer ${adminToken}`);
		expect(response.statusCode).toEqual(401);

	});

	test('401: testuser1 (non-reference user token attempt)', async() => {
		
		const response = await request(app)
			.get('/users/testuser1/private')
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.statusCode).toEqual(401);

	});

	test('401: testuser1 (public view, no token)', async() => {
		
		const response = await request(app)
			.get('/users/testuser1/private');
		expect(response.statusCode).toEqual(401);

	});

	test('401: user not found (404)', async() => {

		const response = await request(app)
			.get('/users/testuser12/private');
		expect(response.statusCode).toEqual(401);

	});

	test('works: testuser3 (reference user token)', async() => {

		const response = await request(app)
			.get('/users/testuser3/private')
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.body).toEqual({
			user: {
				...USER3_PUBLIC_RESPONSE,
				content: []
			}
		});

	});

	test('401: testuser3 (non-reference user token)', async() => {

		const response = await request(app)
			.get('/users/testuser3/private')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(401);

	});

});

/***	GET /users/:username/edit */
describe('GET \`/users/:username/edit\`', () => {

	test('private view (reference user token)', async() => {

		const response = await request(app)
			.get('/users/testuser1/edit')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body).toEqual({
			user: USER1_PRIVATE_RESPONSE
		});

	});

	test('private view (admin usertoken)', async() => {
		
		const response = await request(app)
			.get('/users/testuser1/edit')
			.set('authorization', `Bearer ${adminToken}`);
		expect(response.body).toEqual({
			user: USER1_PRIVATE_RESPONSE
		});

	});

	test('private view (wrong user)', async() => {
		
		const response = await request(app)
			.get('/users/testuser1/edit')
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.statusCode).toEqual(401);

	});

	test('private view (no token)', async() => {
		
		const response = await request(app)
			.get('/users/testuser1/edit');
		expect(response.statusCode).toEqual(401);
	});

	test('\"404 error\": user not found', async() => {

		const response = await request(app)
			.get('/users/testuser12/edit');
		expect(response.statusCode).toEqual(401);
			// never going to be the reference user

	});

});

/***	PATCH /users/:username */
describe('PATCH \`/users/:username/edit\`', () => {

	test('patches (for reference user)', async() => {

		const response = await request(app)
			.patch('/users/testuser1/edit')
			.send({firstName:'af'})
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body).toEqual({
			user: { ...USER1_PRIVATE_RESPONSE, firstName: 'af' }
		});

	});

	test('illegal patch (for reference user)', async() => {

		const response = await request(app)
			.patch('/users/testuser1/edit')
			.send({accountStatus:'banned'})
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(400);

	});

	test('patches (for admin)', async() => {

		const response = await request(app)
			.patch('/users/testuser1/edit')
			.send({accountStatus:'active'})
			.set('authorization', `Bearer ${adminToken}`);
		expect(response.body).toEqual({
			user: { ...USER1_PRIVATE_RESPONSE, accountStatus:'active' }
		});

	});

	test('illegal patch (for admin)', async() => {

		const response = await request(app)
			.patch('/users/testuser1/edit')
			.send({firstName:'af'})
			.set('authorization', `Bearer ${adminToken}`);
		expect(response.statusCode).toEqual(400);

	});
		// really just to reduce complexity of this application, rather than focus on the user-end, focus on the content...

	test('400 error: certain properties are not allowed to be edited through the API', async() => {
			
		const response = await request(app)
			.patch('/users/testuser1/edit')
			.send({isElevated:true})
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(400);

	});

	test('401 error: unauthorized (wrong user)', async() => {
		
		const response = await request(app)
			.patch('/users/testuser1/edit')
			.send({firstName:'afsdadfs'})
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.statusCode).toEqual(401);

	});
		// includes for non-existing users (404) b/c it isn't reference user

	test('401 error: unauthorized (logged out)', async() => {
		
		const response = await request(app)
			.patch('/users/testuser1/edit')
			.send({firstName:'afsdadfs'});
		expect(response.statusCode).toEqual(401);

	});

});

/***	DELETE /users/:username */
describe('DELETE \`/users/:username\`', () => {

	test('deletes user (reference user)', async() => {
		
		const response = await request(app)
			.delete('/users/testuser3')
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.body).toEqual({deleted: 'testuser3'});
		
		const response2 = await request(app)
			.delete('/users/testuser3')
			.set('authorization', `Bearer ${user3Token}`);
		expect(response2.statusCode).toEqual(404);

	});

	test('deletes user (admin)', async() => {
		
		const response = await request(app)
			.delete('/users/testuser3')
			.set('authorization', `Bearer ${adminToken}`);
		expect(response.body).toEqual({deleted: 'testuser3'});
	
	});

	test('401 error: unauthorized (wrong user)', async() => {
		
		const response = await request(app)
			.delete('/users/testuser3')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(401);

	});
		// includes for non-existing users (404) b/c it isn't reference user

	test('401 error: unauthorized (no token)', async() => {
		
		const response = await request(app)
			.delete('/users/testuser3');
		expect(response.statusCode).toEqual(401);

	});

});