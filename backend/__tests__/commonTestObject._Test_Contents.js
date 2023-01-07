/**	SOURCE COMMONS
 *	
*/
const _2022_12_30_DATE = new Date('December 30, 2022 00:00:00');
const _2022_12_30_DATE_STR = "2022-12-30T08:00:00.000Z";

const USER1_SOLO = ["testuser1"];
const USER1_USER2_PARTICIPANTS = ["testuser1", "testuser2"];


const CONTENT_1_BASE = {
	id: 1,
	title: 'test content',
	description: 'mw1',
	link: 'https://youtu.be/nhVJhRhJbJE'
}

const CONTENT_2_BASE = {
	id: 2,
	title: 'test content2',
	description: 'mw2',
	link: 'https://youtu.be/FTvLFlNbSQQ',
}

const CONTENT_3_BASE = {
	id: 3,
	title: 'test content3',
	description: 'afsd',
	link: ''
}

/**	MODEL RESPONSE
 *	Repsonse for model tests.
 */
const USER_1_PUBLIC_CONTENT_MODEL = [
	{
		...CONTENT_1_BASE,
		participants: JSON.stringify(USER1_SOLO),
		datePublished: _2022_12_30_DATE
	},
	{
		...CONTENT_2_BASE,
		participants: JSON.stringify(USER1_USER2_PARTICIPANTS),
		datePublished: _2022_12_30_DATE
	}
];

const USER_2_PUBLIC_CONTENT_MODEL = [
	{
		...CONTENT_2_BASE,
		participants: JSON.stringify(USER1_USER2_PARTICIPANTS),
		datePublished: _2022_12_30_DATE
	}	
];

const USER_1_AND_2_PRIVATE_CONTENT_MODEL = {
	...CONTENT_3_BASE,
	participants: JSON.stringify(USER1_USER2_PARTICIPANTS),
	datePublished: null
}

const USER_1_ALL_CONTENT_MODEL =  [
	...USER_1_PUBLIC_CONTENT_MODEL,
	USER_1_AND_2_PRIVATE_CONTENT_MODEL
];

const USER_2_ALL_CONTENT_MODEL = [
	...USER_2_PUBLIC_CONTENT_MODEL,
	USER_1_AND_2_PRIVATE_CONTENT_MODEL	
];

/**	ROUTER RESPONSE
 *	Response for router tests.
 */
const USER_1_PUBLIC_CONTENT_ROUTER = [
	{
		...CONTENT_1_BASE,
		participants: USER1_SOLO,
		datePublished: _2022_12_30_DATE_STR
	},
	{
		...CONTENT_2_BASE,
		participants: USER1_USER2_PARTICIPANTS,
		datePublished: _2022_12_30_DATE_STR
	}
];

const USER_2_PUBLIC_CONTENT_ROUTER = [
	{
		...CONTENT_2_BASE,
		participants: USER1_USER2_PARTICIPANTS,
		datePublished: _2022_12_30_DATE_STR
	}	
];

const USER_1_AND_2_PRIVATE_CONTENT_ROUTER = {
	...CONTENT_3_BASE,
	participants: USER1_USER2_PARTICIPANTS,
	datePublished: null
}

const USER_1_ALL_CONTENT_ROUTER =  [
	...USER_1_PUBLIC_CONTENT_ROUTER,
	USER_1_AND_2_PRIVATE_CONTENT_ROUTER
];

const USER_2_ALL_CONTENT_ROUTER = [
	...USER_2_PUBLIC_CONTENT_ROUTER,
	USER_1_AND_2_PRIVATE_CONTENT_ROUTER	
];

test('dummy test so that \'jest\' isn\'t screaming that \"Your test suite must contain at least one test.\"', () => {
	expect(1).toEqual(1);
});

module.exports = {
	USER_1_PUBLIC_CONTENT_MODEL,
	USER_2_PUBLIC_CONTENT_MODEL,
	USER_1_ALL_CONTENT_MODEL,
	USER_2_ALL_CONTENT_MODEL,
	USER_1_PUBLIC_CONTENT_ROUTER,
	USER_2_PUBLIC_CONTENT_ROUTER,
	USER_1_ALL_CONTENT_ROUTER,
	USER_2_ALL_CONTENT_ROUTER
}