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

const user1Request = {
	username: 'user1',
	firstName: 'test',
	lastName: 'asdf',
	birthDate: "1991-01-01",
	verified: true,
	accountStatus: 'active',
	email: 'test@asdf.com',
	password: 'password',
	picture: 'default.jpg',
	description: 'test description'
}
const user1InvalidRequest = {
	firstName: 'test',
	lastName: 'asdf',
	birthDate: "1991-01-01",
	verified: true,
	accountStatus: 'active',
	password: 'password',
	picture: 'default.jpg',
	description: 'test description',
	isElevated: false
}
const user1EditResponse = {
	username: 'user1',
	firstName: 'test',
	lastName: 'asdf',
	birthDate: "1991-01-01",
	verified: true,
	email: 'test@asdf.com',
	picture: 'default.jpg',
	description: 'test description',
	isElevated: false
}
const user1PublicResponse = {
	username: 'user1',
	firstName: 'test',
	lastName: 'asdf',
	verified: true,
	picture: 'default.jpg',
	description: 'test description',
	isElevated: false
}

const adminObject = {
	firstName: 'test',
	lastName: 'admin',
	birthDate: "1991-01-01",
	verified: true,
	accountStatus: 'active',
	email: 'admin@asdf.com',
	password: 'password',
	picture: 'default.jpg',
	description: 'test description',
	isElevated: true
}

const user1PublicContent = [
	{
		id:,
		title:,
		description:,
		link:,
		contractSigned:,
		datePublished:
	},
	{
		id:,
		title:,
		description:,
		link:,
		contractSigned:,
		datePublished:
	}
];
const user1InProgressContent = [
	{
		id:,
		title:,
		description:,
		link:,
		status:,
		owner:,
		contractType:,
		contractDetails:,
		contractSigned:,
		dateCreated:,
		dateStandby:,
		datePublished:
	}
];

const user2Content = [];

/***	POST /users */
describe('POST \`/users\`: create', async() => {

	test('works: regular user creation', async() => {

		const response = await request(app)
			.send(user1Request);
		

		expect(response.statusCode).toEqual(201);
		expect(response.body)
			.toEqual({
				user: user1RegularResponse,
				token: expect.any(String)
			});
		
	});

	// test('400 error: invalid form, contains \`isAdmin\` property', async() => {});
	
	test('400 error: invalid form, request does not conform to schema specs', async() => {
		
		const response = await request(app)
			.send(user1InvalidRequest);
		expect(response.statusCode).toEqual(400);

	});

	test('403 error: a token is provided (user attempts to send a create account request while logged in)', async() => {
		
		const response = await request(app)
			.send(user1InvalidRequest)
			.set("authorization", `Bearer ${u1Token}`);
		expect(response.statusCode).toEqual(403);

	});

	test('409 error: duplicate user', async() => {

		const response = await request(app)
			.send(user1Request);
		expect(response.statusCode).toEqual(201);
		

		const response2 = await request(app)
			.send(user1Request);
		expect(response2.statusCode).toEqual(409)

	});

});

/***	GET /users */
describe('GET \`/users\`: search', async() => {

	test('no filter methods (hides admin results)', async() => {

		// 'user'
		const response = await response(app)
			.send({});	
		expect(response.length).toEqual(2);

		// 'a'
		const response = await response(app)
			.send({});
		expect(response.length).toEqual(1);

	});

	test('filter method', async() => {

		const response = await response(app)
			.send({});
		expect(response.length).toEqual(2);

	});

});

/***	GET /users/:username */
describe('GET \`/users/:username\`', async() => {

	test('public view (reference user token)', async() => {

		const response = await request(app)
			.get('/users/user1')
			.set('authorization', `Bearer: ${u1Token}`);
		expect(response.body).toEqual({
			user: user1PublicResponse, 
			content: user1Content
		});

	});

	test('public view (non-reference usertoken)', async() => {
		
		const response = await request(app)
			.get('/users/user1')
			.set('authorization', `Bearer: ${adminUserToken}`);
		expect(response.body).toEqual({
			user: user1PublicResponse, 
			content: user1Content
		});

	});

	test('public view (no token)', async() => {
		
		const response = await request(app)
			.get('/users/user1');
		expect(response.body).toEqual({
			user: user1PublicResponse, 
			content: user1Content
		});

	});

	test('404 error: user not found', async() => {

		const response = await request(app)
			.get('/users/user12');
		expect(response.statusCode).toEqual(404);

	});

});


/***	GET /users/:username/edit */
describe('GET \`/users/:username\`', async() => {

	test('public view (reference user token)', async() => {

		const response = await request(app)
			.get('/users/user1')
			.set('authorization', `Bearer: ${u1Token}`);
		expect(response.body).toEqual({
			user: user1EditResponse
		});

	});

	test('public view (non-reference usertoken)', async() => {
		
		const response = await request(app)
			.get('/users/user1')
			.set('authorization', `Bearer: ${adminUserToken}`);
		expect(response.statusCode).toEqual(403);

	});

	test('public view (no token)', async() => {
		
		const response = await request(app)
			.get('/users/user1');
		expect(response.statusCode).toEqual(403);
	});

	test('404 error: user not found', async() => {

		const response = await request(app)
			.get('/users/user12');
		expect(response.statusCode).toEqual(404);

	});

});

/***	PATCH /users/:username */
describe('PATCH \`/users/:username\`', async() => {

	let patchedUserResponseObject = user1EditResponse;
	patchedUserResponseObject.firstName = 'af';

	test('patches (for reference user)', async() => {

		const response = await request(app)
			.patch('/users/user1')
			.send({firstName:'af'})
			.set('authorization', `Bearer: ${u1Token}`);
		expect(response.body).toEqual({
			user: patchedUserResponseObject
		});

	});

	test('patches (for admin)', async() => {

		const response = await request(app)
			.patch('/users/user1')
			.send({firstName:'af'})
			.set('authorization', `Bearer: ${adminUserToken}`);
		expect(response.body).toEqual({
			user: patchedUserResponseObject
		});

	});
		// really just to reduce complexity of this application, rather than focus on the user-end, focus on the content...

	test('400 error: certain properties are not allowed to be edited through the API', async() => {
			
		const response = await request(app)
			.patch('/users/user1')
			.send({isElevated:true})
			.set('authorization', `Bearer: ${u1Token}`);
		expect(response.statusCode).toEqual(400);

	});

	test('403 error: unauthorized (wrong user)', async() => {
		
		const response = await request(app)
			.patch('/users/user1')
			.send({firstName:'afsdadfs'})
			.set('authorization', `Bearer: ${u2Token}`);
		expect(response.statusCode).toEqual(403);

	});
		// includes for non-existing users (404) b/c it isn't reference user

	test('403 error: unauthorized (logged out)', async() => {
		
		const response = await request(app)
			.patch('/users/user1')
			.send({firstName:'afsdadfs'});
		expect(response.statusCode).toEqual(403);

	});

});

/***	DELETE /users/:username */
describe('DELETE \`/users/:username\`', async() => {

	test('deletes user (reference user)', async() => {
		
		const response = await request(app)
			.delete('/users/user1')
			.set('authorization', `Bearer ${u1Token}`);
		expect(response.body).toEqual({deleted: 'user1'});
		
		const response = await request(app)
			.delete('/users/user1')
			.set('authorization', `Bearer ${u1Token}`);
		expect(response.statusCode).toEqual(404);

	});

	test('deletes user (admin)', async() => {
		
		const response = await request(app)
			.delete('/users/user1')
			.set('authorization', `Bearer ${adminUserToken}`);
		expect(response.body).toEqual({deleted: 'user1'});
	
	});

	test('403 error: unauthorized (wrong user)', async() => {
		
		const response = await request(app)
			.delete('/users/user1')
			.set('authorization', `Bearer: ${u2Token}`);
		expect(response.statusCode).toEqual(403);

	});
		// includes for non-existing users (404) b/c it isn't reference user

	test('403 error: unauthorized (no token)', async() => {
		
		const response = await request(app)
			.delete('/users/user1');
		expect(response.statusCode).toEqual(403);

	});

});