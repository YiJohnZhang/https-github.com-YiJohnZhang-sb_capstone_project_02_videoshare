const db = require('../database/db');
const User = require("../models/User");
const Content = require("../models/Content");
const { createToken } = require("../helpers/tokens");

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

const user1Token = createToken({ username: 'u1', is_elevated: false });
const user2Token = createToken({ username: 'u2', is_elevated: false });
const adminToken = createToken({ username: 'admin', is_elevated: true });

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	user1Token, user2Token,
	adminToken
};
