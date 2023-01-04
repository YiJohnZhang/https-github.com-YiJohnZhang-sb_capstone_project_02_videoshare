const bcrypt = require('bcrypt');

const db = require('../database/db');
const { BCRYPT_WORK_FACTOR } = require('../config');

async function commonBeforeAll() {

	// leave `role_users_join` and `roles` Alone: seed first with `testSeed.sql`
	// await db.query("TRUNCATE TABLE roles_users_join RESTART IDENTITY CASCADE;");
	await db.query("TRUNCATE TABLE contents_users_join RESTART IDENTITY CASCADE;");
		// restart serial at 1

	// noinspection SqlWithoutWhere
	await db.query("TRUNCATE TABLE contents RESTART IDENTITY CASCADE;");
	await db.query("DELETE FROM contents");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM users");
	
	await db.query(`
	INSERT INTO users ("username","first_name","last_name","birthdate","verified","account_status","email","password","picture","description","is_elevated")
		VALUES
			('testuser1', 'Test', 'uSER1', '1990-01-01', TRUE, 'active', 'testUser@test.com', $1, 'xsgamesm-33.jpg', 'afsd2', FALSE),
			('testuser2', 'Test', 'uSER2', '1990-01-01', TRUE, 'active', 'testUser@test.net', $1, 'xsgamesm-49.jpg', 'fasd1', FALSE),
			('adminUser1', 'Admin', 'USER1', '1990-10-23', TRUE, 'active', 'admin@amail.com', $2, 'xsgamesm-23.jpg', 'asdfz', TRUE);
		RETURNING username`,[
			await bcrypt.hash('password', BCRYPT_WORK_FACTOR),
			await bcrypt.hash('admin', BCRYPT_WORK_FACTOR)
		]);
	
	await db.query(`
	INSERT INTO contents(title,summary,description,link,status,owner,contract_type,contract_details,contract_signed,date_created,date_standby,date_published)
		VALUES
			('tempContent1', 'temporarySummary', 'default_description', 'invalidLink', 'published', 'testuser1', 'solo', NULL, NULL, '2022-12-12', '2022-12-26', '2022-12-26'),
			('tempContent2', 'temporarySummary', 'default_description', 'invalidLink', 'published', 'testuser1', 'byview', NULL, NULL, '2022-12-12', '2022-12-26', '2022-12-26'),
			('tempContent3', 'temporarySummary', 'default_description', 'invalidLink', 'open', 'testuser1', 'presplit', NULL, NULL, '2022-12-12', NULL, NULL);
	`);

	await db.query(`
	INSERT INTO contents_users_join(user_id,content_id,description)
		VALUES
			('testuser1', 1, ''),
			('testuser1', 2, ''),
			('testuser2', 2, ''),
			('testuser1', 3, ''),
			('testuser2', 3, '')
	`);

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

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
};