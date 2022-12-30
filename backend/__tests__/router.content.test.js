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

const CREATE_USER4_REQUEST = {
	title: 'testcontent4',
	summary: 'some summary idea',
	description: '',
	owner: 'testuser4',
	participants: '["testuser4"]',
	contractType:'',
	contractDetails:'{views:[{username:"testuser4",share:1}}], engagement:[{username:"testuser4",share:1}}]}',
	contractSigned:'[]'
}
	/*owner:			upon creation, make it currentUser*/
	/*participants:		upon creation, make it '[currentUser]'*/
	/*contractDetails:	upon creation, make it '{views:[{username:'currentUser',share:1}], engagement:[{username:'currentUser',share:1}]}'*/
	/*contractSigned:	upon creation, make it '[]'*/

const INVALID_CREATE_USER4_REQUEST_INSUFF = {
	title: 'testcontent4',
	summary: 'some summary idea'
}

const INVALID_CREATE_USER4_REQUEST_PROHIBITED_PROPERTIES = {
	title: 'testcontent4',
	summary: 'some summary idea',
	status: 'legacy'
}

const CREATE_CONTENT4_RESPONSE = {

}

const CONTENT_1_PUBLIC_RESPONSE = {
	id: '',
	title: '',
	summary: '',
	description: '',
	link: '',
	partipants: '',
	dateCreated: '',
	dateStandby: '',
	datePublished: ''
}

const CONTENT_1_OWNER_RESPONSE = {
	id: '',
	title: '',
	summary: '',
	description: '',
	link: '',
	status: '',
	owner: '',
	contractType: '',
	contractDetails: '',
	contractSigned: '',
	dateCreated: '',
	dateStandby: '',
	datePublished: ''
}

const CONTENT_1_PARTICIPANT_RESPONSE = CONTENT_1_OWNER_RESPONSE;

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

	test('deletes content (admin)', async() => {
		
		const response = await request(app)
			.delete('/contents/1')
			.set('authorization', `Bearer ${adminToken}`);
		expect(response.body).toEqual({deleted: 'content1'});
	
		const response2 = await request(app)
			.delete('/contents/1')
			.set('authorization', `Bearer ${adminToken}`);
		expect(response2.statusCode).toEqual(404);

	});

	test('401: unauthorized (owner user)', async() => {
		
		const response = await request(app)
			.delete('/contents/1')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(401);
	});

	test('401: unauthorized (wrong user)', async() => {
		
		const response = await request(app)
			.delete('/contents/1')
			.set('authorization', `Bearer: ${user3Token}`);
		expect(response.statusCode).toEqual(401);

	});
		// includes for non-existing contents (404) b/c it isn't reference user

	test('401 error: unauthorized (no token)', async() => {
		
		const response = await request(app)
			.delete('/contents/1');
		expect(response.statusCode).toEqual(401);

	});

});