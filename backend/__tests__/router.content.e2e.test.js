const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	user1Token, user3Token,
	adminToken
} = require('./router._testCommons.test');

// beforeAll(commonBeforeAll);
// beforeEach(commonBeforeEach);
// afterEach(commonAfterEach);
// afterAll(commonAfterAll);

const CREATE_CONTENT5_REQUEST = {
	title: 'testcontent5',
		// TEST that it is indeed 5 contents present in db
	summary: 'some summary idea',
	description: '',
	owner: 'testuser1',
	contractType: 'presplit',
	participants: ["testuser1"],
	contractDetails: {views:[{username:"testuser1",share:1}], engagement:[{username:"testuser1",share:1}]},
	contractSigned: []
}

const CREATE_CONTENT5_RESPONSE = {
	id: 5,
		// TEST that it is indeed 5 contents present in db
	title: 'testcontent5',
	summary: 'some summary idea',
	description: '',
	link: '',
	participants: ["testuser1"],
	dateCreated: "2022-12-31T08:00:00.000Z",
	dateStandby: null,
	datePublished: null
}

/***	PATCH /contents/:contentID/edit	*/
describe('PATCH \`contents/:contentID/edit\`', () => {

	// test('integration, ', async() => {

	// 	fail('todo integration test (test join columns)');

	// });

});

/***	PATCH /contents/:contentID/publish	*/
describe('PATCH \`contents/:contentID/publish\`', () => {

	// auth: isLoggedIn, isReferenceUser, isOwner
	// none => {content: parseResponseBodyProperties(contentResult)}
	//	private level

	// test('e2e, 498: error (everyone needs to be signed)', async() => {

	// 	fail('todo: \`498\` e2e test');

	// 	// const response = await request(app)
	// 	// 	.patch('/contents/5/publish')
	// 	// 	.set('authorization', `Bearer ${user1Token}`);
	// 	// expect(response.statusCode).toEqual(498);
	
	// });

	// test('e2e, works', async() => {

	// 	fail('todo: working e2e test');

	// 	/*
	// 	const NEW_CONTENT = {



	// 	}
	// 	*/

	// 	// const response = await request(app)
	// 	// 	.patch('/contents/5/publish')
	// 	// 	.set('authorization', `Bearer ${user1Token}`);
	// 	// expect(response.statusCode).toEqual(200);

	// 	/*



	// 	*/
	
	// });

});
