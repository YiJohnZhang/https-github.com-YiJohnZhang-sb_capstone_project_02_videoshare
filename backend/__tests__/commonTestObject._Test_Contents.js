const _2022_12_30_DATE = new Date('December 30, 2022 00:00:00');

const USER_1_PUBLIC_CONTENT = [
	{
		id: 1,
		title: 'test content',
		description: 'mw1',
		link: 'https://youtu.be/nhVJhRhJbJE',
		participants: JSON.stringify(["testuser1"]),
		datePublished: _2022_12_30_DATE
	},
	{
		id: 2,
		title: 'test content2',
		description: 'mw2',
		link: 'https://youtu.be/FTvLFlNbSQQ',
		participants: JSON.stringify(["testuser1", "testuser2"]),
		datePublished: _2022_12_30_DATE
	}
];

const USER_2_PUBLIC_CONTENT = [
	{
		id: 2,
		title: 'test content2',
		description: 'mw2',
		link: 'https://youtu.be/FTvLFlNbSQQ',
		participants: JSON.stringify(["testuser1", "testuser2"]),
		datePublished: _2022_12_30_DATE
	}	
];

const USER_1_AND_2_PRIVATE_CONTENT_EXAMPLE = {
		id: 3,
		title: 'test content3',
		description: 'afsd',
		link: '',
		participants: JSON.stringify(["testuser1", "testuser2"]),
		datePublished: null
}

const USER_1_ALL_CONTENT =  [
	...USER_1_PUBLIC_CONTENT,
	USER_1_AND_2_PRIVATE_CONTENT_EXAMPLE
];

const USER_2_ALL_CONTENT = [
	...USER_2_PUBLIC_CONTENT,
	USER_1_AND_2_PRIVATE_CONTENT_EXAMPLE	
];

module.exports = {
	USER_1_PUBLIC_CONTENT,
	USER_2_PUBLIC_CONTENT,
	USER_1_ALL_CONTENT,
	USER_2_ALL_CONTENT
}