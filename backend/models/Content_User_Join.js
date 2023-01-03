const db = require('../database/db');
const { sqlCreateQueryBuilder, sqlFilterQueryBuilder, sqlUpdateQueryBuilder } = require('../helpers/sqlQueryingHelper');

const {
	ExpressError,
	NotFoundError,
	BadRequestError,
	ConflictError
} = require('../modules/utilities');

//	Properties to return for a query
const QUERY_GENERAL_PROPERTIES = `
	user_id AS "username",
	content_id AS "contentID",
	description`;
const QUERY_GENERAL_PROPERTIES_JOIN = `
	cu.description AS "description"
`;
const QUERY_CONTENT_JOIN_PROPERTIES = `
	c.id AS "id",
	c.title AS "title",
	c.link AS "link",
	c.status AS "status",
	c.participants AS "participants",
	c.date_created AS "dateCreated",
	c.date_standby AS "dateStandby",
	c.date_published AS "datePublished"`;
	
// const QUERY_USER_PROPERTIES = `
// 	username, 
// 	first_name AS "firstName", 
// 	last_name AS "lastName", 
// 	verified, 
// 	picture,
// 	description`;
	//lowpriority: clean this up and modularize. minus "accountStatus", consider next time designing the schema as "about" instead of "description"

//	JSON-SQL Mapping Constants
const JSON_SQL_SET_MAPPING = {
	userID: 'user_id',
	contentID: 'content_id',
	isActive: 'is_active'
}
const JSON_SQL_QUERY_MAPPING = {
	userID: 'user_id =' ,
	contentID: 'content_id =',
	description: 'description ILIKE',
	isActive: 'is_active ='
}

/** Related functions for ContentUserJoin. */
// extra time, subclass this from integrations/model.js
class ContentUserJoin {

	static relationName = 'contents_users_join';

	/**	getAllUserContent(username)
	 *	Find all matching content_users_join records that for a username.
	 *	Optional: filter data in the form of `queryObject`.
	 *	=> [{ pk, propertyOne, ... }, ...]
	 */
	static async getAllUserContent(username) {

		let result = await db.query(`
			SELECT ${QUERY_CONTENT_JOIN_PROPERTIES}, ${QUERY_GENERAL_PROPERTIES_JOIN}
				FROM contents_users_join
				JOIN "contents" on "contents"."id" = "${this.relationName}"."content_id"
				WHERE user_id = $1
				ORDER BY "contents".date_published`, 
			[username]);

		const contentList = result.rows;
		console.log(contentList);

		return result.rows;
	
	}

	/**	getAllUserPublicContent(username)
	 *	Find all matching content_users_join records that is publicly available for a username.
	 *	Optional: filter data in the form of `queryObject`.
	 *	=> [{ pk, propertyOne, ... }, ...]
	 */
	static async getAllUserPublicContent(username) {

		let result = await db.query(`
			SELECT content_id AS "contentID", description, ${QUERY_CONTENT_JOIN_PROPERTIES}
				FROM contents_users_join
				JOIN "contents" on "contents"."id" = "${this.relationName}"."content_id"
				WHERE user_id = $1 AND ("contents"."status" = 'active' OR "contents"."status" = 'legacy')
				ORDER BY "contents"."date_published"`, 
			[username]);

		const contentList = result.rows;
		console.log(contentList);

		return result.rows;
	
	}

	//	NOT IMPLEMENTED: USEFUL FOR USERS TO PRIORITIZE WHAT TO WORK ON (also searchable).
	/**	getAllPrivateContent(username)
	 *	Find all matching content_users_join records that is publicly available for a username.
	 *	Optional: filter data in the form of `queryObject`.
	 *	=> [{ pk, propertyOne, ... }, ...]
	 */
	static async getAllPrivateContent(username){

		// const sqlQueryBeforeWHERE = (`
		// 	SELECT ${QUERY_GENERAL_PROPERTIES}
		// 	FROM ${this.relationName}
		// 	JOIN "contents" ON "contents.id" = "${this.relationName}.content_id"`);
		// const sqlQueryAfterWHERE = (`ORDER BY contents.date_published`);
		// 	// too late to change 'contents.participants' to ARRAY type

		// let result;

		// if(queryObject){

		// 	const { parameterizedWHERE, whereParameters } = sqlFilterQueryBuilder(queryObject, JSON_SQL_QUERY_MAPPING);
		// 	result = await db.query(`${sqlQueryBeforeWHERE} ${parameterizedWHERE} ${sqlQueryAfterWHERE}`, whereParameters);

		// }else{
		// 	result = await db.query(`${sqlQueryBeforeWHERE} ${sqlQueryAfterWHERE}`);
		// }

		// return result.rows;		

	}

	/**	getByPKPrivate (userID, contentID)
	 *	Given a pk, return data about content_users_join records.
	 *		Returns users: {...} and Joined(contents: {..., cuDescription})
	 *	=> { pk, ... }
	 *
	 *	Throws NotFoundError if content_users_join records not found.
	 */
	 static async getByPKPrivate(userID, contentID) {
		
		const result = await db.query(`
			SELECT ${QUERY_GENERAL_PROPERTIES_JOIN}, ${QUERY_CONTENT_JOIN_PROPERTIES}
				FROM ${this.relationName} AS cu
				JOIN contents AS c ON c.id = cu.content_id
				WHERE cu.user_id = $1 AND cu.content_id = $2
			`, [userID, contentID]);

		const cuJoinObject = result.rows[0];

		if (!cuJoinObject)
			throw new NotFoundError(`Cannot find ${this.relationName}: (${userID}, ${contentID})`);

		return cuJoinObject;

	}

	/**	getByPK(userID, contentID)
	 *	Given a pk, return data about content_users_join records.
	 *		Returns users: {...} and Joined(contents: {..., cuDescription})
	 *	=> { pk, ... }
	 *
	 *	Throws NotFoundError if content_users_join records not found.
	 */
	 static async getByPK(userID, contentID) {
		
		const cuJoinObject = await this.getByPKPrivate(userID, contentID);

		if(cuJoinObject.status)
			delete cuJoinObject.status;

		if(cuJoinObject.dateCreated)
			delete cuJoinObject.dateCreated;

		if(cuJoinObject.dateStandby)
			delete cuJoinObject.dateStandby;

		return cuJoinObject;

	}

	/**	update(, ...)
	 *	Update content_users_join records data with `updateRecordObject`.
	 *
	 *	This is for a partial update of a record; and it only changes provided ones.
	 *
	 *	`updateRecordObject` may include any of the following:
	 *		{ ... }
	 *
	 *	=> { ... }
	 *
	 *	Throws NotFoundError if not found.
	 *	@param {string} user_id - composite primary key
	 *	@param {string} contentID - composite primary key
	 *	...
	 *	@param {object} updateRecordObject - data to update the primary key
	 */
	static async update(userID, contentID, updateRecordObject) {

		const { description } = updateRecordObject;
		const result = await db.query(`
			UPDATE ${this.relationName}
				SET description = $1
				WHERE user_id = $2 AND content_id = $3
				RETURNING description
			`, [description, userID, contentID]);

		console.log({description, userID, contentID})

		const adsf = await db.query(`select * from ${this.relationName} where user_id = 'testuser1' AND content_id = 1`);
		console.log(adsf.rows[0])

/*
		const result = await db.query(`
			UPDATE ${this.relationName}
				SET description = $1
				FROM (
					SELECT description
					FROM ${this.relationName}
					WHERE user_id = $
				)
				JOIN contents AS "c" ON c.id = contents_id
				WHERE user_id = $2 AND content_id = $3
				RETURNING description, ${QUERY_CONTENT_JOIN_PROPERTIES}
			`, [description, userID, contentID]);
*/
		console.log('aFDS')
		const cuJoinObject = result.rows[0];
		console.log(result.rows[0])

		if (!cuJoinObject)
			throw new NotFoundError(`Cannot find ${this.relationName}: (${userID}, ${contentID})`);

		return cuJoinObject;

	}

	/**	delete(username, contentID)
	 *	Delete content_users_join records from database by `pk`.
	 *
	 *	=> `cuJoinObject` = { username, contentID }.
	 */
	static async delete(userID, contentID) {

		let result = await db.query(`
			DELETE
				FROM ${this.relationName}
				WHERE user_id = $1 AND content_id = $2
				RETURNING user_id as "username", content_id
			`,[userID, contentID]);

		const cuJoinObject = result.rows[0];

		if (!cuJoinObject)
			throw new NotFoundError(`No ${this.relationName}: (${userID}, ${contentID})`);

		return cuJoinObject;

	}

/** */
	

}

module.exports = ContentUserJoin;