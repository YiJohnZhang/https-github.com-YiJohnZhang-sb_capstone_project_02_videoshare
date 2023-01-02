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
	user_id AS "userID",
	content_id AS "contentID",
	description`;
const QUERY_PRIVATE_PROPERTIES = ``;

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
class ContentUserJoin {

	static relationName = 'contents_users_join';

	/**	Create a single content_users_join record (invitation)
	 *	technically any participant?
	 */
	static async invite(inviterUsername, contentID, invitedUsername){
	}

	// /**	Create a single content_users_join record (invitation)
	//  *	only owner
	//  */
	static async publish(username, contentID){
	}

	/**	Create content_users_join record with data.
	 *
	 *	=> { ... }
	 *
	 *	Throws BadRequestError for duplicates.
	 */
	static async create(newRecordObject, ntomJoin = []){
	}

	// 2022-12-31: NOTE THIS IS NOW REDUNDANT BECAUSE I ELECTED TO MAKE IT THAT "participants" 
	/**	Find all matching content_users_join records.
	 *	Optional: filter data in the form of `queryObject`.
	 *	=> [{ pk, propertyOne, ... }, ...]
	 */
	static async getAllPublic(queryObject) {

		// const sqlQueryBeforeWHERE = (`
		// 	SELECT ${QUERY_GENERAL_PROPERTIES}
		// 	FROM ${this.relationName}
		// 	JOIN "contents" ON "contents.id" = "${this.relationName}.content_id"`);
		// const sqlQueryAfterWHERE = (`ORDER BY contents.date_published`);
		
		// let result;

		// if(queryObject){

		// 	const { parameterizedWHERE, whereParameters } = sqlFilterQueryBuilder(queryObject, JSON_SQL_QUERY_MAPPING);
		// 	result = await db.query(`${sqlQueryBeforeWHERE} ${parameterizedWHERE} AND (contents.status = 'published' OR contents.status = 'legacy') ${sqlQueryAfterWHERE}`, whereParameters);

		// }else{
		// 	result = await db.query(`${sqlQueryBeforeWHERE} WHERE (contents.status = 'published' OR contents.status = 'legacy') ${sqlQueryAfterWHERE}`);
		// }

		// return result.rows;
	
	}

	static async getAllPrivate(username){

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
	
	/**	Find all matching content_users_join records.
	 *	Optional: filter data in the form of `queryObject`.
	 *	=> [{ pk, propertyOne, ... }, ...]
	 */

	/**	Given a pk, return data about content_users_join records.
	 *
	 *	=> { pk, ... }
	 *
	 *	Throws NotFoundError if content_users_join records not found.
	 */
	static async getByPK(userID, contentID) {
		
		// join query
		console.log("adf")
		const temp = await db.query(`
			SELECT contents.id
				FROM ${this.relationName}
				JOIN contents ON contents.id = ${this.relationName}.id
		`);

		console.log(temp.rows);

		const result = await db.query(`
			SELECT contents.id, contents.title, description, contents.link, contents.participants, contents.date_published AS "datePublished"
				FROM ${this.relationName}
				JOIN contents ON contents.id = ${this.relationName}.content_id
				WHERE user_id = $1 AND content_id = $2`, [userID, contentID]);

		const cuJoinObject = result.rows[0];
		console.log(cuJoinObject)

		if (!cuJoinObject)
			throw new NotFoundError(`Cannot find ${this.relationName}: ${pk}`);

		return cuJoinObject;

	}

	static async pkDoesNotAlreadyExist(userID, contentID){

		const result = await db.query(`
			SELECT user_id AS "username"
				FROM ${this.relationName}
				WHERE user_id = $1 AND content_id = $2`, [userID, contentID]);
		
		const cuJoinObject = result.rows[0];

		if(cuJoinObject)
			throw new ConflictError(`(${userID}, ${contentID}) already exists.`);
		
		return;

	}

	/**	Update content_users_join records data with `updateRecordObject`.
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