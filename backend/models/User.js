const bcrypt = require('bcrypt');

const db = require('../database/db');
const { sqlUpdateQueryBuilder, sqlFilterQueryBuilder } = require("../helpers/sqlQueryingHelper");
const {
	NotFoundError,
	BadRequestError,
	UnauthorizedError,
	ConflictError
} = require("../modules/utilities");

const { BCRYPT_WORK_FACTOR } = require("../config.js");
const QUERY_GENERAL_PROPERTIES = `
	username, 
	first_name AS "firstName", 
	last_name AS "lastName", 
	verified, 
	account_status AS "accountStatus", 
	picture, 
	description`;
const QUERY_PRIVATE_PROPERTIES = 'birthdate, email';
const AUTHENTICATION_PROPERTIES = `username, is_elevated AS "isElevated"`;
const JSON_SQL_SET_MAPPING = {
	firstName: 'first_name',
	lastName: 'last_name',
	accountStatus: 'account_status',
	isElevated: 'is_elevated'
}
const JSON_SQL_QUERY_MAPPING = {
	username: 'username ILIKE'
}

class User {

	/**	authenticate user with username, password.
	 *
	 *	=> { modelName, password }
	 *
	 *	Throws UnauthorizedError is user not found or wrong password.
	 **/
	static async authenticate(username, password) {

		// try to find the user first
		const result = await db.query(`
			SELECT ${AUTHENTICATION_PROPERTIES}, password
				FROM users
				WHERE username = $1;`,
			[username]);

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
	 *	@param {string} username
	 *	@param {string} password
	 *	@param {string} firstName
	 *	@param {string} lastName
	 *	@param {string} email
	 *	@param {integer} birthdateYear
	 *	@param {integer} birthdateMonth
	 *	@param {integer} birthdateDay
	 **/
	static async register({ username, password, firstName, lastName, email, birthdateYear, birthdateMonth, birthdateDay }){

		const userExists = await db.query(`
			SELECT username
				FROM users
				WHERE username = $1`,
			[username]);

		if (userExists.rows[0])
			throw new ConflictError(`Username, \'${username}\' already taken`);

		const birthdate = `'${birthdateYear}-${birthdateMonth}-${birthdateDay}'`;
		const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

		const result = await db.query(`
			INSERT INTO users
				(username, password, first_name, last_name, email, birthdate)
				VALUES ($1, $2, $3, $4, $5, $6)
				RETURNING ${AUTHENTICATION_PROPERTIES};`,
			[username, hashedPassword, firstName, lastName, email, birthdate]
		);

		const userObject = result.rows[0];

		return userObject;

	}

	/**	Find all matching users.
	 *	Optional: filter data in the form of `queryObject`.
	 *	=> { username, firstName, lastName, birthdate, verified, accountStatus, email, picture, description, isElevated }
	 **/
	static async getAll(queryObject) {

		const sqlQueryBeforeWHERE = (`
			SELECT ${QUERY_GENERAL_PROPERTIES}
				FROM users`
		);

		const sqlQueryAfterWHERE = ('ORDER BY username')

		let result;

		const queryObjectLength = Object.keys(queryObject).length || 0;
			// by default req.query is `{}` and `{}` is truthy
			// console.log(queryObject == true)

		if(queryObjectLength){

			if(queryObject.username)
				queryObject.username = `%${queryObject.username}%`;
			
			const {parameterizedWHERE, whereParameters} = sqlFilterQueryBuilder(queryObject, JSON_SQL_QUERY_MAPPING);

			result = await db.query(`${sqlQueryBeforeWHERE} ${parameterizedWHERE} ${sqlQueryAfterWHERE};`, whereParameters);

		}else{

			result = await db.query(`${sqlQueryBeforeWHERE} ${sqlQueryAfterWHERE};`);

		}

		return result.rows;

	}

	/**	Given a username, return data about user.
	 *
	 *	=> { username, firstName, lastName, birthdate, verified, accountStatus, email, picture, description, isElevated }
	 *
	 *	Throws NotFoundError if user not found.
	 **/
	static async getByPK(username) {

		const result = await db.query(`
			SELECT ${QUERY_GENERAL_PROPERTIES}
				FROM users
				WHERE username = $1`,
			[username]);

		const userObject = result.rows[0];

		if (!userObject)
			throw new NotFoundError(`Cannot find user: ${username}`);

		return userObject;

	}

	/**	Given a username, and is reference user, return full data.
	 *	
	 *	=> { username, firstName, lastName, birthdate, verified, accountStatus, email, password, picture, description, isElevated, join }
	 *
	 *	Throws NotFoundError if user not found.
	 */
	static async getByPKPrivate(username) {

		const result = await db.query(`
			SELECT ${QUERY_GENERAL_PROPERTIES}, ${QUERY_PRIVATE_PROPERTIES}
				FROM users
				WHERE username = $1`,
			[username]);

		const userObject = result.rows[0];

		if (!userObject)
			throw new NotFoundError(`Cannot find user: ${username}`);

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

		const { parameterizedSET, setParameters } = sqlUpdateQueryBuilder(updateData, JSON_SQL_SET_MAPPING);
		const usernameParameterIndex = "$".concat(setParameters.length + 1);

		const updateQuerySQL = `
			UPDATE users 
				SET ${parameterizedSET} 
				WHERE username = ${usernameParameterIndex} 
				RETURNING ${QUERY_GENERAL_PROPERTIES}, ${QUERY_PRIVATE_PROPERTIES}`;
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

		let result = await db.query(`
			DELETE
				FROM users
				WHERE username = $1
				RETURNING username`,
			[username]);

		const userObject = result.rows[0];
		
		if (!userObject)
			throw new NotFoundError(`No user: ${username}`);

		return userObject;

	}

}

module.exports = User;