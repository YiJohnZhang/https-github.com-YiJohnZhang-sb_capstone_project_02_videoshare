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
	"contents_users_join"."contentID" AS "contentID",
	"contents_users_join"."description" AS "description"
`;
const QUERY_CONTENT_JOIN_PROPERTIES = `
	"contents"."title" AS "title",
	"contents"."link" AS "link",
	"contents"."status" AS "status",
	"contents"."participants" AS "participants",
	"contents"."date_created" AS "dateCreated",
	"contents"."date_standy" AS "dateStandby",
	"contents"."date_published" AS "datePublished"`;
	// todo: consider removing "status"
	//lowpriority: clean this up and modularize. minus "description, summary, dateCreated, dateStandby"
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
			SELECT ${QUERY_GENERAL_PROPERTIES_JOIN}, ${QUERY_CONTENT_JOIN_PROPERTIES}
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

	//	NOT IMPLEMENTED: USERFUL FOR USERS TO PRIORITIZE WHAT TO WORK ON (also searchable).
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
		
		console.log("adf")
		// just trying out join queries here
		const result = await db.query(`
			SELECT ${QUERY_GENERAL_PROPERTIES_JOIN}, ${QUERY_CONTENT_JOIN_PROPERTIES}
				FROM ${this.relationName}
				JOIN "contents" ON "contents"."id" = "${this.relationName}"."id"
				WHERE user_id = $1 AND content_id = $2
		`, [userID, contentID]);

		const cuJoinObject = result.rows[0];
		console.log(cuJoinObject)

		if (!cuJoinObject)
			throw new NotFoundError(`Cannot find ${this.relationName}: ${pk}`);

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
		
		console.log("adf")
		// just trying out join queries here
		const result = await this.getByPKPrivate(userID, contentID);

		const cuJoinObject = result.rows[0];
		console.log(cuJoinObject)

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

		await this.getByPK(userID, contentID);

		// 2022-12-29 Note: generalize for composite PK by passing in pk as object and do a parameterizedWHERE query builder on it

		// do something with `updateRecordObject` if necessary, i.e. remove certain properties that are forbidden to be updated or modify passed values

		const { parameterizedSET, setParameters } = sqlUpdateQueryBuilder(updateRecordObject, JSON_SQL_SET_MAPPING);
		const pkParameterIndex = setParameters.length + 1;

		const updateQuerySQL = `
			UPDATE ${this.relationName} 
				SET ${parameterizedSET} 
				WHERE user_id = $${pkParameterIndex} AND content_id = $${pkParameterIndex+1} 
				RETURNING ${QUERY_GENERAL_PROPERTIES}`;
		const result = await db.query(updateQuerySQL, [...setParameters, userID, contentID]);

		const cuJoinObject = result.rows[0];

		return cuJoinObject;

	}

	/**	Delete content_users_join records from database by `pk`.
	 *
	 *	=> `cuJoinObject` = { username, contentID }.
	 */
	static async delete(userID, contentID) {

		let result = await db.query(`
			DELETE
				FROM ${this.relationName}
				WHERE user_id = $1 AND content_id = $2
				RETURNING user_id as "username", content_id`, [userID, contentID]);

		const cuJoinObject = result.rows[0];

		if (!cuJoinObject)
			throw new NotFoundError(`No ${this.relationName}: (${userID}, ${contentID})`);

		return cuJoinObject;

	}

/** */
	

}

module.exports = ContentUserJoin;