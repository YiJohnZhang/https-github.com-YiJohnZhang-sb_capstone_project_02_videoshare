const db = require('../database/db');
const bcrypt = require("bcrypt");
const { sqlUpdateQueryBuilder } = require("../helpers/sqlQueryingHelper");
const createTokenHelper = require('createTokenHelper');
const {
	NotFoundError,
	BadRequestError,
	UnauthorizedError
} = require("../modules/utilities");

const { BCRYPT_WORK_FACTOR } = require("../config.js");
const generalQueryReturnProperties = `username, first_name AS "firstName", last_name AS "lastName", birthdate, verified, account_status AS "accountStatus", email, picture, description, is_elevated AS "isElevated"`;
const setJSONSQLMapping = {
	firstName: 'first_name',
	lastName: 'last_name',
	accountStatus: 'account_status',
	isElevated: 'is_elevated',
}
const queryJSONSQLMapping = {
	username: 'username ILIKE'
}

class User {

	/**	authenticate user with username, password.
	 *
	 *	=> { modelName }
	 *
	 *	Throws UnauthorizedError is user not found or wrong password.
	 **/
	static async authenticate(username, password) {

		// try to find the user first
		const result = await db.query(
			`SELECT ${generalQueryReturnProperties}, password"
			FROM users
			WHERE username = $1`,
			[username]
		);

		const userObject = result.rows[0];

		if(userObject){

			const isValid = await bcrypt.compare(password, userObject.password);
			
			if(isValid) {
				delete userObject.password;
				return userObject;
			}

		}

		throw new UnauthorizedError("Invalid username/password.");
	
	}

	/**	Register user with data.
	 *
	 *	=> { ... }
	 *
	 *	Throws BadRequestError for duplicates.
	 **/
	static async register({ username, password, firstName, lastName, email }){

		const userExists = await db.query(
			`SELECT username
			FROM users
			WHERE username = $1`,
			[username]
		);

		if (userExists.rows[0])
			throw new BadRequestError(`Username, \'${username}\' already taken`);

		const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

		const result = await db.query(
			`INSERT INTO users
			(username, password, first_name, last_name, email, is_elevated)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING ${generalQueryReturnProperties}`,
			[username, hashedPassword, firstName, lastName, email, isElevated]
		);

		const userObject = result.rows[0];

		return userObject;

	}

	/**	Find all matching users.
	 *	Optional: filter data in the form of `queryObject`.
	 *	=> { username, firstName, lastName, birthdate, verified, accountStatus, email, picture, description, isElevated, join }
	 **/
	static async getAll(queryObject) {
		
		const result = await db.query(
			`SELECT  ${generalQueryReturnProperties}
			FROM users
			ORDER BY username`
		);

		return result.rows;

	}

	/**	Given a username, return data about user.
	 *
	 *	=> { username, firstName, lastName, birthdate, verified, accountStatus, email, picture, description, isElevated, join }
	 *		where join is [{ content_id (join), description (join), title, link }]
	 *
	 *	Throws NotFoundError if user not found.
	 **/
	static async getByPK(username) {

		const result = await db.query(
			`SELECT  ${generalQueryReturnProperties}
			FROM users
			WHERE username = $1`,
			[username],
		);

		const userObject = result.rows[0];

		if (!userObject)
			throw new NotFoundError(`Cannot find user: ${username}`);

		// ??TODO???: map query content!

		return userObject;

	}

	/**	Update user data with `updateData`.
	 *
	 *	This is for a partial update of a record; and it only changes provided ones.
	 *
	 *	`updateData` may include any of the following:
	 *		{ firstName, lastName, password }
	 *
	 *	=> { username, firstName, lastName, birthdate, verified, accountStatus, email, picture, description, isElevated, join }
	 *
	 *	Throws NotFoundError if not found.
	 */
	static async update(username, updateData) {

		await this.getByPK(username);

		//	changing elevated status is only available by modifying the database manually.
		if (updateData.isElevated)
			delete updateData.isElevated;

		if (updateData.password)
			updateData.password = await bcrypt.hash(updateData.password, BCRYPT_WORK_FACTOR);

		const { parameterizedSET, setParameters } = sqlUpdateQueryBuilder(updateData, setJSONSQLMapping);
		const usernameParameterIndex = "$".concat(setParameters.length + 1);

		const updateQuerySQL = `UPDATE users 
						SET ${parameterizedSET} 
						WHERE username = ${usernameParameterIndex} 
						RETURNING ${generalQueryReturnProperties}`;
		const result = await db.query(updateQuerySQL, [...setParameters, username]);

		const userObject = result.rows[0];
		delete userObject.password;
		return userObject;

	}

	/**	Delete given user from database by `username`.
	 *
	 *	=> `undefined`.
	 **/
	static async delete(username) {

		let result = await db.query(
			`DELETE
				FROM users
				WHERE username = $1
				RETURNING username`,
			[username],
		);

		const userObject = result.rows[0];

		if (!userObject)
			throw new NotFoundError(`No user: ${username}`);

	}

}

module.exports = User;