const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require ('../config');

const db = require('../database/db');
const User = require('../models/User');
const Content = require('../models/Content');
const createTokenHelper = require('../helpers/createTokenHelper');

async function commonBeforeAll() {

	// leave `role_users_join` and `roles` Alone: seed first with `testSeed.sql`
	await db.query("TRUNCATE TABLE contents_users_join RESTART IDENTITY CASCADE;");
		// restart serial at 1

	// noinspection SqlWithoutWhere
	await db.query("TRUNCATE TABLE contents RESTART IDENTITY CASCADE;");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM users");

	await User.register({
		username: 'testuser1',
		firstName: 'Test',
		lastName: 'User1',
		password: 'password',
		email: 'testuser1@gmail.com', 
		birthdateYear:1990,
		birthdateMonth:1,
		birthdateDay:1,
	});

	await User.register({
		username: 'testuser2',
		firstName: 'Test',
		lastName: 'User2',
		password: 'password',
		email: 'testuser2@gmail.com', 
		birthdateYear:1990,
		birthdateMonth:1,
		birthdateDay:1,
	});

	//	the api does not allow creating elevated users
	await db.query(`
		INSERT INTO users ("username","first_name","last_name","birthdate","verified","account_status","email","password","picture","description","is_elevated")
		VALUES
			('adminUser1', 'Admin', 'USER1', '1990-10-23', TRUE, 'active', 'admin@amail.com', $1, 'xsgamesm-23.jpg', 'asdfz', TRUE)`,[
			await bcrypt.hash('admin', BCRYPT_WORK_FACTOR)
		]);

	await Content.create({
		title: 'test content',
		summary: 'afdsa',
		description: 'fdas',
		owner: 'testuser1'
	});

	await Content.create({
		title: 'test content2',
		summary: 'afsd',
		description: 'asfd',
		owner: 'testuser1'
	});

	await Content.create({
		title: 'test content3',
		summary: 'asdfdsafa',
		description: 'asdaf',
		owner: 'testuser1'
	});

	await db.query(`
	INSERT INTO contents_users_join(user_id,content_id,description)
		VALUES
			('testuser1', 1, NULL),
			('testuser1', 2, NULL),
			('testuser2', 2, NULL),
			('testuser1', 3, NULL),
			('testuser2', 3, NULL)`);

}

async function commonBeforeEach() {
	await db.query('BEGIN');
}

async function commonAfterEach() {
	await db.query('ROLLBACK');
}

async function commonAfterAll() {
	await db.end();
}

test('dummy test so that \'jest\' isn\'t screaming that \"Your test suite must contain at least one test.\"', () => {
	// console.log(BCRYPT_WORK_FACTOR);
	expect(1).toEqual(1);
});

const user1Token = createTokenHelper({ username: 'u1', is_elevated: false });
const user2Token = createTokenHelper({ username: 'u2', is_elevated: false });
const adminToken = createTokenHelper({ username: 'admin', is_elevated: true });

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	user1Token, user2Token,
	adminToken
};
