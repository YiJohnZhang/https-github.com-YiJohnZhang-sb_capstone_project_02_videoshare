process.env.NODE_ENV = "TEST";

const { NotFoundError, BadRequestError, UnauthorizedError } = require("../modules/utilities");
const db = require("../database/db");
const User = require("../models/user");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll
} = require('./model._testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/****	Authenticate (Login) */
describe('authenticate', () => {

	test('works', async() => {
		
		const user = await User.authenticate('user1', 'password');
		expect(user).toEqual({

		});

	});

	test('error: no such user', async() => {

		try{
			await User.authenticate('afsd', 'password');
		}catch(error){
			expect(error instanceof NotFoundError).toBeTruthy();
		}

	});

	test('error: wrong password', async() => {

		try{
			await User.authenticate('user1', 'fads');
		}catch(error){
			expect(error instanceof UnauthorizedError).toBeTruthy();
		}

	});

});

/***	Register */
describe('register', () => {

	const newUserObject = {
		username: 'testuser',
		firstName: 'test',
		lastName: 'user',
		// birthdate: ,	date object
		email: 'afsd@asdf.com',
		isElevated: false
	}

	test('works', async() => {

	});



});

/***	returnAll() */


/***	returnByUsername() */


/***	update() */


/***	delete() */
describe('register', () => {

	test('works', async() => {

		await User.delete('user1');
		const response = await db.query(
			"SELECT * FROM username='user1'");
		
		expect(response.rows.length).toEqual(0);

		try{
			await User.delete('user1')
		}catch(error){
			expect(error instanceof NotFoundError).toBeTruthy();
		}

	});

	test('error: ', async() => {

		try{
			await User.delete('adfs');
		}catch(error){
			expect(error instanceof NotFoundError).toBeTruthy();
		}

	});

});