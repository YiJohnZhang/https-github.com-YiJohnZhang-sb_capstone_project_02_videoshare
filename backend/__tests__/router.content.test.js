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
	owner: 'testuser1',
	contractType: 'presplit',
	participants: ["testuser1"],
	contractDetails: {views:[{username:"testuser1",share:1}], engagement:[{username:"testuser1",share:1}]},
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
	id: 4,
	title: 'testcontent4',
	summary: 'some summary idea',
	description: '',
	link: '',
	participants: ["testuser1"],
	dateCreated: "2022-12-31T08:00:00.000Z",
	dateStandby: null,
	datePublished: null
}

const CONTENT_1_PUBLIC_RESPONSE = {
	id: 1,
	title: 'test content',
	summary: 'afdsa',
	description: 'fdas',
	link: 'https://youtu.be/nhVJhRhJbJE',
	participants: ["testuser1"],
	dateCreated: '2022-12-29T08:00:00.000Z',
	dateStandby: '2022-12-29T08:00:00.000Z',
	datePublished: '2022-12-30T08:00:00.000Z'
}

const CONTENT_1_PRIVATE_RESPONSE = {
	id: 1,
	title: 'test content',
	summary: 'afdsa',
	description: 'fdas',
	link: 'https://youtu.be/nhVJhRhJbJE',
	status: 'published',
	owner: 'testuser1',
	contractType: 'solo',
	participants: ["testuser1"],
	contractDetails: {views:[{username:"testuser1",share:1}], engagement:[{username:"testuser1",share:1}]},
	contractSigned: ["testuser1"],
	dateCreated: '2022-12-29T08:00:00.000Z',
	dateStandby: '2022-12-29T08:00:00.000Z',
	datePublished: '2022-12-30T08:00:00.000Z'
}

/***	POST /contents	*/
describe('POST \`/contents/\`', () => {

	// auth: isLoggedIn
	// req.body => 201.{content: parseResponseBodyProperties(contentResult)}
	//	public level

	test('works', async() => {

		const response = await request(app)
			.post('/contents/')
			.send(CREATE_CONTENT4_REQUEST)
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(201);
		expect(response.body.content).toEqual(CREATE_CONTENT4_RESPONSE);
	
	});

	test('400: incomplete request body', async() => {

		const response = await request(app)
			.post('/contents/')
			.send(CREATE_CONTENT4_REQUEST_INVALID_INSUFF)
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(400);
	
	});

	test('400: illegal request body', async() => {

		const response = await request(app)
			.post('/contents/')
			.send(CREATE_CONTENT4_REQUEST_INVALID_ILLEGAL_PROPERTIES)
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(400);
	
	});

	test('401: not logged in', async() => {

		const response = await request(app)
			.post('/contents/')
			.send(CREATE_CONTENT4_REQUEST);
		expect(response.statusCode).toEqual(401);
	
	});
	
});

/***	GET /contents	*/
describe('GET \`/contents/\`', () => {

	// auth: none
	// optional req.query => {content: parseResponseBodyProperties(contentResult)}
	//	public level

	test('public and matching', async() => {

		const response = await request(app)
			.get('/contents/')
			.query({title: " conte"})
		expect(response.body.contents.length).toEqual(3);
	
	});

	test('public no query', async() => {

		const response = await request(app)
			.get('/contents/')
			.query()
		expect(response.body.contents.length).toEqual(3);
	
	});

	test('public and non-matching', async() => {

		const response = await request(app)
			.get('/contents/')
			.query({title: "asdf"});
		expect(response.body.contents.length).toEqual(0);
	
	});

	test('loggedin and matching', async() => {

		const response = await request(app)
			.get('/contents/')
			.query({title: "2"})
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body.contents.length).toEqual(1);
	
	});

	test('loggedin and non-matching', async() => {

		const response = await request(app)
			.get('/contents/')
			.query({title: "asdf"})
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body.contents.length).toEqual(0);
	
	});

});

/***	GET /contents/:contentID	*/
describe('GET \`/contents/:contentID\`', () => {

	// auth: none
	// => {content: parseResponseBodyProperties(contentResult)}
	//	public level

	test('public request, content1', async() => {

		const response = await request(app)
			.get('/contents/1');
		expect(response.body.content).toEqual(CONTENT_1_PUBLIC_RESPONSE);
	
	});

	test('loggedin request, content1', async() => {

		const response = await request(app)
			.get('/contents/1')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body.content).toEqual(CONTENT_1_PUBLIC_RESPONSE);
	
	});

	test('404: content not found', async() => {

		const response = await request(app)
			.get('/contents/6')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(404);
	
	});

});

/***	GET /contents/:contentID/edit	*/
describe('GET \`/contents/:contentID/edit\`', () => {

	// auth: isLoggedIn, isParticipant
	// => {content: parseResponseBodyProperties(contentResult)}
	//	private level

	test('works', async() => {

		const response = await request(app)
			.get('/contents/3/edit')
			.set('authorization', `Bearer ${user1Token}`);
		console.log(response.body);
		expect(response.body.content).toEqual(CONTENT_1_PRIVATE_RESPONSE);
	
	});

	test('401: unauthorized (wrong user)', async() => {

		const response = await request(app)
			.get('/contents/3/edit')
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.statusCode).toEqual(401);
	
	});

	test('401: unauthorized (public)', async() => {

		const response = await request(app)
			.get('/contents/3/edit');
			expect(response.statusCode).toEqual(401);
	
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
		expect(response.body.content).toEqual();
	
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
		expect(response.body.content).toEqual();
	
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
		expect(response.body.content).toEqual();
	
	});

});

/***	DELETE /contents/:id */
/*	out of scope.
describe('DELETE \`/contents/:id\`', () => {

	test('deletes content (admin)', async() => {
		
		const response = await request(app)
			.delete('/contents/1')
			.set('authorization', `Bearer ${adminToken}`);
		expect(response.body.content).toEqual({deleted: 'content1'});
	
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