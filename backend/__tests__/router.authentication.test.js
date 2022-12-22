const request = require('supertest');

const app = require('../app');
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	u1Token,
	adminUserToken
} = require('./router._testCommons');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/***	LOGIN users /authenticate/token */
describe('GET \`/authenticate/token`', async() => {

	test('', async() => {

		

	});

});