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

const CREATE_CONTENT4_REQUEST = {
	title: 'testcontent4',
	summary: 'some summary idea',
	description: '',
	owner: 'testuser4',
	participants: ["testuser4"],
	contractType:'',
	contractDetails: {views:[{username:"testuser4",share:1}], engagement:[{username:"testuser4",share:1}]},
	contractSigned:[]
}
	/*owner:			upon creation, make it currentUser*/
	/*participants:		upon creation, make it '[currentUser]'*/
	/*contractDetails:	upon creation, make it '{views:[{username:'currentUser',share:1}], engagement:[{username:'currentUser',share:1}]}'*/
	/*contractSigned:	upon creation, make it '[]'*/

const CREATE_CONTENT4_REQUEST_INVALID_INSUFF = {
	title: 'testcontent4',
	summary: 'some summary idea'
}

const CREATE_CONTENT4_REQUEST_INVALID_ILLEGAL_PROPERTIES = {
	title: 'testcontent4',
	summary: 'some summary idea',
	status: 'legacy'
}

const CREATE_CONTENT4_RESPONSE = {

}

const CONTENT_1_PUBLIC_RESPONSE = {
	id: 1,
	title: 'test content',
	summary: 'afdsa',
	description: 'mw1',
	link: 'https://youtu.be/nhVJhRhJbJE',
	participants: ["testuser1"],
	dateCreated: '2022-12-29',
	dateStandby: '2022-12-29',
	datePublished: '2022-12-30'
}

const CONTENT_1_OWNER_RESPONSE = {
	id: 1,
	title: 'test content',
	summary: 'afdsa',
	description: 'mw1',
	link: 'https://youtu.be/nhVJhRhJbJE',
	status: 'published',
	owner: 'testuser1',
	contractType: 'solo',
	participants: ["testuser1"],
	contractDetails: {views:[{username:"testuser1",share:1}], engagement:[{username:"testuser1",share:1}]},
	contractSigned: ["testuser1"],
	dateCreated: '2022-12-29',
	dateStandby: '2022-12-29',
	datePublished: '2022-12-30'
}

const CONTENT_1_PARTICIPANT_RESPONSE = CONTENT_1_OWNER_RESPONSE;

/***	POST /contents	*/
describe('POST \`/contents/\`', () => {

	// auth: isLoggedIn
	// req.body => 201.{content: parseResponseBodyProperties(contentResult)}
	//	public level


	test('', async() => {

		const response = await request(app)
			.post('/contents/')
			.send({})
			.set('authorizaiton', `Bearer ${Token}`);
		expect(response.body).toEqual();
	
	});
	
});

/***	GET /contents	*/
describe('GET \`/contents/\`', () => {

	// auth: none
	// optional req.query => {content: parseResponseBodyProperties(contentResult)}
	//	public level

	test('', async() => {

		const response = await request(app)
			.get('/contents/')
			.query({})
			.set('authorization', `Bearer ${Token}`);
		expect(response.body).toEqual();
	
	});

});

/***	GET /contents/:contentID	*/
describe('GET \`/contents/:contentID\`', () => {

	// auth: none
	// => {content: parseResponseBodyProperties(contentResult)}
	//	public level

	test('', async() => {

		const response = await request(app)
			.get('/contents/CONTENTID')
			.query({})
			.set('authorization', `Bearer ${Token}`);;
		expect(response.body).toEqual();
	
	});

});

/***	GET /contents/:contentID/edit	*/
describe('GET \`/contents/:contentID/edit\`', () => {

	// auth: isLoggedIn, isParticipant
	// => {content: parseResponseBodyProperties(contentResult)}
	//	private level

	test('', async() => {

		const response = await request(app)
			.get('/contents/CONTENTID/edit')
			.query({})
			.set('authorization', `Bearer ${Token}`);
		expect(response.body).toEqual();
	
	});

});

/***	PATCH /contents/:contentID/edit	*/
describe('PATCH \`contents/:contentID/edit\`', () => {

	// auth: isLoggedIn, isParticipatingUser
	// req.body => {content: parseResponseBodyProperties(contentResult)}
	//	private level


	test('', async() => {

		const response = await request(app)
			.patch('/contents/CONTENTID/edit')
			.send({})
			.set('authorization', `Bearer ${Token}`);
		expect(response.body).toEqual();
	
	});

});

/***	PATCH /contents/:contentID/sign	*/
describe('PATCH \`contents/:contentID/sign\`', () => {

	// auth: isLoggedIn, isReferenceUser, isParticipant
	// rqe.body => {content: parseResponseBodyProperties(contentResult)}
	//	private level

	test('', async() => {

		const response = await request(app)
		.patch('/contents/CONTENTID/edit')
		.send({})
		.set('authorization', `Bearer ${Token}`);
		expect(response.body).toEqual();
	
	});

});

/***	PATCH /contents/:contentID/:username/publish	*/
describe('PATCH \`contents/:contentID/:username/publish\`', () => {

	// auth: isLoggedIn, isReferenceUser, isOwner
	// none => {content: parseResponseBodyProperties(contentResult)}
	//	private level

	
	test('', async() => {

		const response = await request(app)
			.patch('/contents/CONTENTID/edit')
			.send({})
			.set('authorization', `Bearer ${Token}`);
		expect(response.body).toEqual();
	
	});

});

/***	DELETE /contents/:id */
/*	out of scope.
describe('DELETE \`/contents/:id\`', () => {

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
*/