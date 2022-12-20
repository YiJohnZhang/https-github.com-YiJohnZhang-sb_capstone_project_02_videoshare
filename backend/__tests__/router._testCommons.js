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
	// await ...

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
