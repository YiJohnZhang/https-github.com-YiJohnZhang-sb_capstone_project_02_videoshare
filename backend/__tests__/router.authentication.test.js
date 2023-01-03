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

const LOGIN_USER1_REQUEST = {
	username: 'testuser1',
	password: 'password'
}

const CREATE_USER4_REQUEST = {
	username: 'testuser4',
	firstName: 'Test',
	lastName: 'User4',
	password: 'password',
	email: 'testuser4@gmail.com', 
	birthdate: '1990-01-01'	
}

const INVALID_CREATE_USER4_REQUEST = {
	username: 'testuser4',
	firstName: 'Test',
	lastName: 'User4',
	password: 'password',
	email: 'testuser4@gmail.com', 
	birthdateYear:1990,
	birthdateMonth:1
}


/***	LOGIN users /authentication/token */
describe('POST \`/authentication/token\`', () => {

	test('works', async() => {

		const response = await request(app)
			.post('/authentication/login')
			.send(LOGIN_USER1_REQUEST);
		// console.log(response.body);
		expect(response.body).toEqual({
			username: LOGIN_USER1_REQUEST.username,
			token: expect.any(String)
		});

	});

	test('401: error invalid credentials (username, still 401)', async() => {

		const response = await request(app)
			.post('/authentication/login')
			.send({...LOGIN_USER1_REQUEST, username: 'adsf'});
		expect(response.statusCode).toEqual(401);

	});


	test('401: error invalid credentials (password)', async() => {

		const response = await request(app)
			.post('/authentication/login')
			.send({...LOGIN_USER1_REQUEST, password: 'adsf'});
		expect(response.statusCode).toEqual(401);

	});

	test('403: cannot be logged in to login', async() => {

		const response = await request(app)
			.post('/authentication/login')
			.send(LOGIN_USER1_REQUEST)
			.set("authorization", `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(403);

	});

});

/***	REGISTER /authentication/register (MOVED FROM `router.user.test.js`)*/
describe('POST \`/authentication/register\`', () => {

	test('works', async() => {

		const response = await request(app)
			.post('/authentication/register')
			.send(CREATE_USER4_REQUEST);
		// console.log(response.body);
		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			username: CREATE_USER4_REQUEST.username,
			token: expect.any(String)
		});
		
	});

	test('403 error: a token is provided (user attempts to send a create account request while logged in)', async() => {
		
		const response = await request(app)
			.post('/authentication/register')
			.send(CREATE_USER4_REQUEST)
			.set("authorization", `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(403);

	});

	test('400 error: invalid form, contains \`isElevated\` property', async() => {

		const response = await request(app)
			.post('/authentication/register')
			.send({...CREATE_USER4_REQUEST, isElevated: true});
		expect(response.statusCode).toEqual(400);

	});
	
	test('400 error: invalid form, request does not conform to schema specs', async() => {
		
		const response = await request(app)
			.post('/authentication/register')
			.send(INVALID_CREATE_USER4_REQUEST);
		expect(response.statusCode).toEqual(400);

	});

	test('409 error: duplicate user', async() => {

		const response = await request(app)
			.post('/authentication/register')
			.send(CREATE_USER4_REQUEST);
		expect(response.statusCode).toEqual(201);
		

		const response2 = await request(app)
			.post('/authentication/register')
			.send(CREATE_USER4_REQUEST);
		expect(response2.statusCode).toEqual(409);

	});

});