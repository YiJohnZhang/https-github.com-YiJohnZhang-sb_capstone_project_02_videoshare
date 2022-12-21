const request = require('supertest');

const db = require('../database/db');
const app = require('../app');
const User = require('../models/user');

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

/***	POST /users */
describe('', async() => {

	test('', async() => {



	});

})

/***	GET /users */
describe('', async() => {

	test('', async() => {



	});

})

/***	POST /users/:username */
describe('', async() => {

	test('', async() => {



	});

})

/***	GET /users/:username */
describe('', async() => {

	test('', async() => {



	});

})

/***	PATH /users/:username */
describe('', async() => {

	test('', async() => {



	});

})

/***	DELETE /users/:username */
describe('', async() => {

	test('', async() => {



	});

})
