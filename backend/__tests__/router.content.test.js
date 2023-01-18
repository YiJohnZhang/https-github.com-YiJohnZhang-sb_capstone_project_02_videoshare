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

//	DATE OBJECT
const today = new Date();
const JSONDate_string = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const JSONDate_JSON = JSONDate_string.toJSON();

//	
const CREATE_CONTENT4_REQUEST = {
	title: 'testcontent4',
	summary: 'some summary idea',
	description: '',
	owner: 'testuser1',
	contractType: 'presplit',
	participants: ["testuser1"],
	contractDetails: {views:[{username:"testuser1",share:1}], engagement:[{username:"testuser1",share:1}]},
	contractSigned: []
}
	/*owner:			upon creation, make it currentUser*/
	/*participants:		upon creation, make it (frontend default) '[currentUser]'*/
	/*contractDetails:	upon creation, make it (frontend default) '{views:[{username:'currentUser',share:1}], engagement:[{username:'currentUser',share:1}]}'*/
	/*contractSigned:	upon creation, make it (frontend default) '[]'*/

const CREATE_CONTENT4_REQUEST_INVALID_INSUFF = {
	title: 'testcontent4',
	summary: 'some summary idea'
}

const CREATE_CONTENT4_REQUEST_INVALID_ILLEGAL_PROPERTIES = {
	...CREATE_CONTENT4_REQUEST,
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
	...CONTENT_1_PUBLIC_RESPONSE,
	status: 'published',
	owner: 'testuser1',
	contractType: 'solo',
	contractDetails: {views:[{username:"testuser1",share:1}], engagement:[{username:"testuser1",share:1}]},
	contractSigned: ["testuser1"]
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
		expect(response.body.content).toEqual({content_id:4});
	
	});

	// todo: once done with cu_join, insert a test that checks for multiple records creation
	const MODIFIED_CREATE_CONTENT4_REQUEST = {...CREATE_CONTENT4_REQUEST, participants:["testuser1", "testuser2", "testuser3"]};

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

	test('public no query', async() => {

		const response = await request(app)
			.get('/contents/')
			.query();
		expect(response.body.contents.length).toEqual(2);
			// 4 total contents in db

	});

	test('public and matching \' conte\'', async() => {

		const response = await request(app)
			.get('/contents/')
			.query({title: " conte"});
		expect(response.body.contents.length).toEqual(2);
	
	});

	test('public and matching \' 2\'', async() => {

		const response = await request(app)
			.get('/contents/')
			.query({title: "2"});
		expect(response.body.contents.length).toEqual(1);
	
	});

	test('public and none matching \' asdf\'', async() => {

		const response = await request(app)
			.get('/contents/')
			.query({title: "asdf"});
		expect(response.body.contents.length).toEqual(0);
	
	});
	test('loggedin and no query', async() => {

		const response = await request(app)
			.get('/contents/')
			.query()
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body.contents.length).toEqual(2);
			// 4 total contents in db

	});

	test('loggedin and matching \' conte\'', async() => {

		const response = await request(app)
			.get('/contents/')
			.query({title: " conte"})
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body.contents.length).toEqual(2);
	
	});

	test('loggedin and matching \' 2\'', async() => {

		const response = await request(app)
			.get('/contents/')
			.query({title: "2"})
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body.contents.length).toEqual(1);
	
	});

	test('loggedin and non-matching \' asdf\'', async() => {

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

/***	GET /contents/:contentID/random	*/
describe('GET \`/contents/:contentID/random\`', () => {

	// auth: none
	// => {content: parseResponseBodyProperties(contentResult)}
	//	public level

	test('public request, content1', async() => {

		const response = await request(app)
			.get('/contents/1/random');
		expect(response.body.username).toEqual('testuser1');
	
	});

	test('loggedin request, content1', async() => {

		const response = await request(app)
			.get('/contents/1/random')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body.username).toEqual('testuser1');
	
	});

	test('public request, content2', async() => {

		const response = await request(app)
			.get('/contents/2/random');
		expect(['testuser1', 'testuser2']).toContain(response.body.username);
	
	});

	test('loggedin request, content2', async() => {

		const response = await request(app)
			.get('/contents/2/random')
			.set('authorization', `Bearer ${user1Token}`);
		expect(['testuser1', 'testuser2']).toContain(response.body.username);
	
	});

	test('404: content not found', async() => {

		const response = await request(app)
			.get('/contents/100/random');
		expect(response.statusCode).toEqual(404);
	
	});

});

/***	GET /contents/:contentID/edit	*/
describe('GET \`/contents/:contentID/edit\`', () => {

	// auth: isLoggedIn, isParticipant
	// => {content: parseResponseBodyProperties(contentResult)}
	//	private level

	test('works, content 1', async() => {

		const response = await request(app)
			.get('/contents/1/edit')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.body.content).toEqual(CONTENT_1_PRIVATE_RESPONSE);
	
	});

	test('works, content 3', async() => {

		const response = await request(app)
			.get('/contents/1/edit')
			.set('authorization', `Bearer ${user1Token}`);
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

	test('works', async() => {

		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...CREATE_CONTENT4_REQUEST, 
				description: 'asdffdas',
				participants: ["testuser1", "testuser2", "testuser3"],
				contractDetails: {views:[{username:"testuser1",share:0.125}, {username:"testuser2",share:0.125}, {username:"testuser3",share:0.75}], engagement:[{username:"testuser1",share:0.18}, {username:"testuser2",share:0.18}, {username:"testuser3",share:0.64}]},
				contractSigned: ["testuser1"]
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.body.content).toEqual({
			...CREATE_CONTENT4_REQUEST, 
			description: 'asdffdas', 
			participants: ["testuser1", "testuser2", "testuser3"],
			contractDetails: {views:[{username:"testuser1",share:0.125}, {username:"testuser2",share:0.125}, {username:"testuser3",share:0.75}], engagement:[{username:"testuser1",share:0.18}, {username:"testuser2",share:0.18}, {username:"testuser3",share:0.64}]},
			contractSigned: ["testuser1"],
			id: 4,
			link: '',
			status: 'open',
			dateCreated: JSONDate_JSON,
			dateStandby: null,
			datePublished: null
		});
	
	});

	test('401: unauthorized (wrong user)', async() => {

		const response = await request(app)
			.patch('/contents/3/edit')
			.set('authorization', `Bearer ${user3Token}`);

		expect(response.statusCode).toEqual(401);
	
	});

	test('401: unauthorized (public)', async() => {

		const response = await request(app)
			.patch('/contents/3/edit');

		expect(response.statusCode).toEqual(401);
	
	});

});

/***		===Schema Testing for Robustness=== */
describe('Update Schema Testing', () => {

	const TEMPORARY_CONTENT4_REQUEST = {
		...CREATE_CONTENT4_REQUEST,
		description: 'asdffdas',
		participants: ["testuser1", "testuser2", "testuser3"],
		contractDetails: {views:[{username:"testuser1",share:0.125}, {username:"testuser2",share:0.125}, {username:"testuser3",share:0.75}], engagement:[{username:"testuser1",share:0.18}, {username:"testuser2",share:0.18}, {username:"testuser3",share:0.64}]},
		contractSigned: ["testuser1"]
	}
	
	test('works: participants field (see PATCH \`contents/:contentID/edit\: works) ', async() => {

		const response = await request(app)
			.patch('/contents/4/edit')
			.send(TEMPORARY_CONTENT4_REQUEST)
			.set('authorization', `Bearer ${user1Token}`);

		const dateCreated_JSON = response.body.content.dateCreated;
		const split_dateCreated_JSON = dateCreated_JSON.split('-');

		expect(response.body.content).toEqual({
			...TEMPORARY_CONTENT4_REQUEST,
			id: 4,
			link: '',
			status: 'open',
			dateCreated: expect.any(String),
			datePublished: null,
			dateStandby: null
		});

		// testing dateCreated
		expect(split_dateCreated_JSON.length).toEqual(3);
		expect(split_dateCreated_JSON[0].length).toEqual(4);
		expect(split_dateCreated_JSON[1].length).toEqual(2);
		expect(split_dateCreated_JSON[2].split('T').length).toEqual(2);
		expect(split_dateCreated_JSON[2].split('T')[0].length).toEqual(2);

	});
	
	test('400, BRE: \'participants\', username invalid (too short)', async() => {

		// this will be true for contractSigned entr(ies)
		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				participants: ["testuser1", ""]
			})
			.set('authorization', `Bearer ${user1Token}`)

		expect(response.statusCode).toEqual(400);

	});
	
	test('400, BRE: \'participants\', username invalid (too long)', async() => {

		// this will be true for contractSigned entr(ies)
		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				participants: ["testuser1", "123456789012345678901234567890123"]
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});
	
	test('400, BRE: \'participants\', duplicate entries', async() => {

		// this will be true for contractSigned entr(ies)
		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				participants: ["testuser1", "testuser1"]
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});
	
	test('400, BRE: \'participants\', needs at least 1 entry', async() => {

		// this will be true for contractSigned entr(ies)
		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				participants: []
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});
	
	/*	
	test('contractSigned field', async() => {



	});*/
	
	test('400, BRE: \'contractDetails\', illegal property', async() => {

		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				contractDetails: { views:[{username:"testuser1",share:1, illegalProperty:'wait, that\'s illegal'}], engagement:[{username:"testuser1",share:1}] }
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});
	
	test('400, BRE: \'contractDetails\', missing property', async() => {

		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				contractDetails: { views:[{username:"testuser1"}], engagement:[{username:"testuser1",share:1}] }
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});
	
	test('400, BRE: \'contractDetails\', needs at least 1 entry', async() => {

		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				contractDetails: { views:[], engagement:[{username:"testuser1",share:1}] }
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});
	
	test('400, BRE: \'contractDetails\', duplicate entries', async() => {

		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				contractDetails: { views:[{username:"testuser1",share:1}, {username:"testuser1",share:1}], engagement:[{username:"testuser1",share:1}] }
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});

	test('400, BRE: \'contractDetails\', number < 0', async() => {

		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				contractDetails: { views:[{username:"testuser1",share:-0.1}], engagement:[{username:"testuser1",share:1}] }
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});

	test('400, BRE: \'contractDetails\', number > 1', async() => {

		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				contractDetails: { views:[{username:"testuser1",share:1}], engagement:[{username:"testuser1",share:1.1}] }
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});


	test('400, BRE: \'contractDetails\', username.length < 4', async() => {

		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				contractDetails: { views:[{username:"tes",share:1}], engagement:[{username:"testuser1",share:1.1}] }
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});

	test('400, BRE: \'contractDetails\', username.length > 32', async() => {

		const response = await request(app)
			.patch('/contents/4/edit')
			.send({
				...TEMPORARY_CONTENT4_REQUEST,
				contractDetails: { views:[{username:"123456789012345678901234568790123",share:1}], engagement:[{username:"testuser1",share:1.1}] }
			})
			.set('authorization', `Bearer ${user1Token}`);

		expect(response.statusCode).toEqual(400);

	});

});

/***	DEPRECATED: PATCH /contents/:contentID/sign	*/
describe('PATCH \`contents/:contentID/sign\`', () => {

	// auth: isLoggedIn, isReferenceUser, isParticipant
	// rqe.body => {content: parseResponseBodyProperties(contentResult)}
	//	private level

	// test('', async() => {

	// 	const response = await request(app)
	// 	.patch('/contents/CONTENTID/sign')
	// 	.send({})
	// 	.set('authorization', `Bearer ${user1Token}`);
	// 	expect(response.body.content).toEqual();
	
	// });

});

/***	PATCH /contents/:contentID/publish	*/
describe('PATCH \`contents/:contentID/publish\`', () => {

	// auth: isLoggedIn, isReferenceUser, isOwner
	// none => {content: parseResponseBodyProperties(contentResult)}
	//	private level

	test('496: invalid content status', async () => {

		const response = await request(app)
			.patch('/contents/1/publish')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(496);
	
	});

	test('497: invalid link', async() => {

		const response = await request(app)
			.patch('/contents/3/publish')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(497);
	
	});

	test('401: unauthorized (wrong user)', async() => {

		const response = await request(app)
			.patch('/contents/3/publish')
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.statusCode).toEqual(401);
	
	});

	test('401: unauthorized (public)', async() => {

		const response = await request(app)
			.patch('/contents/3/publish');
		expect(response.statusCode).toEqual(401);
	
	});

	test('404: not found', async() => {

		const response = await request(app)
			.patch('/contents/6/publish')
			.set('authorization', `Bearer ${user1Token}`);
		expect(response.statusCode).toEqual(404);
	
	});

});

/***	UNUSED: DELETE /contents/:id */
describe('DELETE \`/contents/:id\`', () => {

	test('deletes content (admin)', async() => {

		// ignore, possible schema redesign?
		// const response = await request(app)
		// 	.delete('/contents/1')
		// 	.set('authorization', `Bearer ${adminToken}`);
		// expect(response.body).toEqual({deleted: 1});
	
		// const response2 = await request(app)
		// 	.delete('/contents/1')
		// 	.set('authorization', `Bearer ${adminToken}`);
		// expect(response2.statusCode).toEqual(404);

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
			.set('authorization', `Bearer ${user3Token}`);
		expect(response.statusCode).toEqual(401);

	});

	test('401 error: unauthorized (no token)', async() => {
		
		const response = await request(app)
			.delete('/contents/1');
		expect(response.statusCode).toEqual(401);

	});

});