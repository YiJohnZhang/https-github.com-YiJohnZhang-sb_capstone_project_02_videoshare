const db = require('../database/db');
const request = require('supertest');
const app = require('../app');

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	adminToken
} = require('./router._testCommons.test');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const CREATE_CONTENT_INTEGRATION_E2E_REQUEST = {
	title: 'e2e test content',
	summary: 's',
	description: 'd',
	owner: 'adminUser1',
	contractType: 'presplit',
	participants: ["testuser1", "testuser2", "adminUser1"],
	contractDetails: {views:[{username:"testuser1",share:1}], engagement:[{username:"testuser1",share:1}]},
	contractSigned: []
}

const EXPECTED_E2E_CONTENT_ID = 4;

// content life span:
//	1. creation with n users
//	2. 1+modification of n users (removal)
//	3. signing of n users
//	4. publish with n users, out of order

async function cleanupResponse(app, contentID) {

	const cleanupResponse = await request(app)
		.delete(`/contents/${contentID}`)
		.set('authorization', `Bearer ${adminToken}`);

	const cleanupResponse2 = await request(app)
		.delete(`/contents/${contentID}`)
		.set('authorization', `Bearer ${adminToken}`);
	expect(cleanupResponse2.statusCode).toEqual(404);

}

/***	CREATE content	*/
describe('CREATE content', () => {
	// create then delete

	test('e2e, number of joins created is correct (3)', async() => {

		const createResponse = await request(app)
			.post('/contents/')
			.send(CREATE_CONTENT_INTEGRATION_E2E_REQUEST)
			.set('authorization', `Bearer ${adminToken}`);
		expect(createResponse.statusCode).toEqual(201);
			
		const { content_id:id } = createResponse.body.content;
		expect(id).toEqual(EXPECTED_E2E_CONTENT_ID);
		// console.log(id);

		//	TEST "create" creates the correct number of joins
		const queryResult = await db.query(`
		SELECT COUNT(*)
			FROM contents_users_join
			WHERE content_id = $1
		`,[id]);
		expect(queryResult.rows[0].count).toEqual("3");
			// 3 join contents

		//	Clean up
		await cleanupResponse(app, EXPECTED_E2E_CONTENT_ID);

	});

});

/***	UPDATE content: change participants	*/
describe('UPDATE content, participants', () => {
	// create, modify, then delete

	test('e2e, create w/ 1 participant then add 2 participants', async() => {

		const createResponse = await request(app)
			.post('/contents/')
			.send({
				...CREATE_CONTENT_INTEGRATION_E2E_REQUEST,
				participants: ["adminUser1"]
			})
			.set('authorization', `Bearer ${adminToken}`);
		expect(createResponse.statusCode).toEqual(201);
			
		const { content_id:id } = createResponse.body.content;
		expect(id).toEqual(EXPECTED_E2E_CONTENT_ID+1);
		// console.log(id);

		//	TEST "create" creates the correct number of joins
		const queryResult = await db.query(`
		SELECT COUNT(*)
			FROM contents_users_join
			WHERE content_id = $1
		`,[id]);
		expect(queryResult.rows[0].count).toEqual("1");

		//	Add 2 participants
		const patchReponse = await request(app)
			.patch(`/contents/${EXPECTED_E2E_CONTENT_ID+1}/edit`)
			.send({
				...CREATE_CONTENT_INTEGRATION_E2E_REQUEST,
				participants: ["adminUser1", "testuser1", "testuser2"]
			})
			.set('authorization', `Bearer ${adminToken}`);

		//	TEST "create" creates the correct number of joins
		const queryResult2 = await db.query(`
		SELECT COUNT(*)
			FROM contents_users_join
			WHERE content_id = $1
		`,[id]);
		expect(queryResult2.rows[0].count).toEqual("3");

		//	Clean Up
		await cleanupResponse(app, EXPECTED_E2E_CONTENT_ID+1);

	});

	test('e2e, create w/ 3 participants then rm 2', async() => {

		const createResponse = await request(app)
			.post('/contents/')
			.send({
				...CREATE_CONTENT_INTEGRATION_E2E_REQUEST,
				participants: ["adminUser1", "testuser1", "testuser2"]
			})
			.set('authorization', `Bearer ${adminToken}`);
		expect(createResponse.statusCode).toEqual(201);
			
		const { content_id:id } = createResponse.body.content;
		expect(id).toEqual(EXPECTED_E2E_CONTENT_ID+2);
		// console.log(id);

		//	TEST "create" creates the correct number of joins
		const queryResult = await db.query(`
		SELECT COUNT(*)
			FROM contents_users_join
			WHERE content_id = $1
		`,[id]);
		expect(queryResult.rows[0].count).toEqual("3");
			// 3 join contents

		//	rm 2 participants
		const patchReponse = await request(app)
			.patch(`/contents/${EXPECTED_E2E_CONTENT_ID+2}/edit`)
			.send({
				...CREATE_CONTENT_INTEGRATION_E2E_REQUEST,
				participants: ["adminUser1"]
			})
			.set('authorization', `Bearer ${adminToken}`);

		//	TEST "create" creates the correct number of joins
		const queryResult2 = await db.query(`
		SELECT COUNT(*)
			FROM contents_users_join
			WHERE content_id = $1
		`,[id]);
		expect(queryResult2.rows[0].count).toEqual("1");
			// 1 join content

		//	Clean Up
		await cleanupResponse(app, EXPECTED_E2E_CONTENT_ID+2);

	});

	test('e2e, create w/ 2 participants, add net 0; test other join records are unaffected', async() => {

		//	Check Join Records Count, Begin
		const checkJoinRecordsBegin = await db.query(`
		SELECT COUNT(*)
			FROM contents_users_join
		`);

		const CURRENT_NUMBER_OF_JOIN_RECORDS = Number(Math.floor(checkJoinRecordsBegin.rows[0].count));
		expect(CURRENT_NUMBER_OF_JOIN_RECORDS).toEqual(5);

		//	Create New Content
		const createResponse = await request(app)
			.post('/contents/')
			.send({
				...CREATE_CONTENT_INTEGRATION_E2E_REQUEST,
				participants: ["adminUser1", "testuser1"]
			})
			.set('authorization', `Bearer ${adminToken}`);
		expect(createResponse.statusCode).toEqual(201);
			
		const { content_id:id } = createResponse.body.content;
		expect(id).toEqual(EXPECTED_E2E_CONTENT_ID+3);
		// console.log(id);

		//	TEST "create" creates the correct number of joins
		const queryResult = await db.query(`
		SELECT COUNT(*)
			FROM contents_users_join
			WHERE content_id = $1
		`,[id]);
		expect(queryResult.rows[0].count).toEqual("2");
			// 2 join contents

		//	Add net 0 participants (swap testuser1 for testuser2)
		const patchReponse = await request(app)
			.patch(`/contents/${EXPECTED_E2E_CONTENT_ID+3}/edit`)
			.send({
				...CREATE_CONTENT_INTEGRATION_E2E_REQUEST,
				participants: ["adminUser1", "testuser2",]
			})
			.set('authorization', `Bearer ${adminToken}`);

		//	TEST has the correct number of joins
		const queryResult2 = await db.query(`
		SELECT COUNT(*)
			FROM contents_users_join
			WHERE content_id = $1
		`,[id]);
		expect(queryResult2.rows[0].count).toEqual("2");
			// 2 join contents

		//	Clean Up
		await cleanupResponse(app, EXPECTED_E2E_CONTENT_ID+3);

		//	Check Join Records Count, End
		const checkJoinRecordsEnd = await db.query(`
		SELECT COUNT(*)
			FROM contents_users_join
		`);

		expect(Number(Math.floor(checkJoinRecordsEnd.rows[0].count))).toEqual(5);

	});

});

/***	UPDATE content: publish	*/
describe('PATCH \`contents/:contentID/publish\`', () => {
	// create, modify, publish, then delete

	test('e2e, 498: error (everyone needs to be signed)', async() => {

		const createResponse = await request(app)
			.post('/contents/')
			.send({
				...CREATE_CONTENT_INTEGRATION_E2E_REQUEST,
				participants: ["adminUser1", "testuser1"]
			})
			.set('authorization', `Bearer ${adminToken}`);
		expect(createResponse.statusCode).toEqual(201);

		const patchLinkResponse = await request(app)
			.patch(`/contents/${EXPECTED_E2E_CONTENT_ID+4}/edit`)
			.send({
				...CREATE_CONTENT_INTEGRATION_E2E_REQUEST,
				link: 'test_link',
				contractSigned: ["adminUser1"]
			})
			.set('authorization', `Bearer ${adminToken}`);

		const response = await request(app)
			.patch(`/contents/${EXPECTED_E2E_CONTENT_ID+4}/publish`)
			.set('authorization', `Bearer ${adminToken}`);
		expect(response.statusCode).toEqual(498);

		//	Clean Up
		await cleanupResponse(app, EXPECTED_E2E_CONTENT_ID+4);
	
	});

	test('e2e, works', async() => {


		const createResponse = await request(app)
			.post('/contents/')
			.send({
				...CREATE_CONTENT_INTEGRATION_E2E_REQUEST
			})
			.set('authorization', `Bearer ${adminToken}`);
		expect(createResponse.statusCode).toEqual(201);

		const patchLinkResponse = await request(app)
			.patch(`/contents/${EXPECTED_E2E_CONTENT_ID+5}/edit`)
			.send({
				...CREATE_CONTENT_INTEGRATION_E2E_REQUEST,
				link: 'test_link',
				contractSigned: ["testuser1", "adminUser1", "testuser2"]
			})
			.set('authorization', `Bearer ${adminToken}`);

		const response = await request(app)
			.patch(`/contents/${EXPECTED_E2E_CONTENT_ID+5}/publish`)
			.set('authorization', `Bearer ${adminToken}`);
			expect(response.statusCode).toEqual(200);
			expect(response.body.content).toEqual('success');

		//	Clean Up
		await cleanupResponse(app, EXPECTED_E2E_CONTENT_ID+5);
	
	});

});