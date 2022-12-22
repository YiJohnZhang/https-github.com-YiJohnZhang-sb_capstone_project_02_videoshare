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

/***	LOGIN users /authenticate/token */
describe('GET \`/authenticate/token`', async() => {

	test('', async() => {



	});

});