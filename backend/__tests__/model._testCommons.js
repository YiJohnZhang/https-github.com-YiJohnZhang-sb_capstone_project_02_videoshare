const bcrypt = require('bcrypt');

const db = require('../database/db');
const { BCRYPT_WORK_FACTOR } = require('../config');

async function commonBeforeAll() {

	await db.query("TRUNCATE TABLE contents_users_join RESTART IDENTITY CASCADE;");
		// restart serial at 1

	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM contents CASCADE");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM users");

	// TODO
	/* await db.query(`
		INSERT INTO users	(username, firstName, lastName, birthdate, email, password, isElevated)
			VALUES	('user1', 'u1f', 'u1l', 1991-01-01, 'users1@email.com', $1, 0),
					('user2', 'u2f', 'u2l', 1991-01-01, 'users2@email.com', $2, 0),
					('admin', 'a1f', 'a1l', 1991-01-01, 'admin1@email.com', $2, 1)
		RETURNING username`,
		[
			await bcrypt.hash('password', BCRYPT_WORK_FACTOR),
			await bcrypt.hash('admin', BCRYPT_WORK_FACTOR),
		]);*/
	
	/* await db.query(`
		INSERT INTO relationname	()
			VALUES	(),
					(),
					()`);*/

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
	expect(1).toEqual(1);
});

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
};