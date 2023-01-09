const db = require('../database/db');
const { 
	sqlCreateQueryBuilder, 
	sqlFilterQueryBuilder, 
	sqlUpdateQueryBuilder, 
	sqlJoinMultipleQueryBuilder_Configured 
} = require('../helpers/sqlQueryingHelper');
const {
	parseResponseBodyProperties
} = require('../helpers/objectStringifyAndParseHelper');
const checkArrayEquality = require('../helpers/arrayEqualityHelper');

const {
	NotFoundError,
	ConflictError,
	UnauthorizedError,
	ExpressError
} = require('../modules/utilities');

//	Properties to return for a query
const QUERY_GENERAL_PROPERTIES = `
	id,
	title,
	summary,
	description,
	link,
	participants,
	date_created AS "dateCreated",
	date_standby AS "dateStandby",
	date_published AS "datePublished"`;
const QUERY_PRIVATE_PROPERTIES = `
	status, 
	owner,
	contract_type AS "contractType", 
	contract_details AS "contractDetails", 
	contract_signed AS "contractSigned"`;

//	JSON-SQL Mapping Constants
const JSON_SQL_SET_MAPPING = {
	dateCreated: "date_created",
	dateStandby: "date_standby",
	datePublished: "date_published",
	contractType: "contract_type", 
	contractDetails: "contract_details", 
	contractSigned: "contract_signed"
}
const JSON_SQL_QUERY_MAPPING = {
	title: 'title ILIKE'
}



/** Related functions for Content. */
// extra time, subclass this from integrations/model.js
class Content {

	static relationName = 'contents';

	/**	create(...)	
	 *	Create content with data.
	 *
	 *	=> { ... }
	 *
	 *	Throws ConflictError for duplicates.
	 **/
	static async create(newRecordObject){

		const RELATION_NAME = this.relationName

		async function createNewRecord(newRecordObject){
		
			try{

				const { parameterizedINSERTPropertyNames, parameterizedINSERTPropertyIndices, insertParameters } = sqlCreateQueryBuilder(newRecordObject, JSON_SQL_SET_MAPPING);

				const result = await db.query(`
					INSERT INTO ${RELATION_NAME} ${parameterizedINSERTPropertyNames}
						VALUES ${parameterizedINSERTPropertyIndices}
						RETURNING ${QUERY_GENERAL_PROPERTIES}`, [...insertParameters]);

				const contentObject = result.rows[0];
				return contentObject;

			}catch(error){

				await db.query('ROLLBACK');
				throw new ConflictError(`${error}`);

			}
		
		}

		await db.query('BEGIN');

		const newContentObject = await createNewRecord(newRecordObject);

		try {

			const { id, description, participants } = parseResponseBodyProperties(newContentObject);

			const { stringifiedVALUES } = sqlJoinMultipleQueryBuilder_Configured([], participants, 'user_id = ', id, description);
			const result = await db.query(`
			INSERT INTO contents_users_join (user_id, content_id, description)
				${stringifiedVALUES}
				RETURNING content_id`);


			await db.query('COMMIT');
			
			const newContentId = result.rows[0];
			return newContentId;

		}catch(error){

			await db.query('ROLLBACK');
			throw new ExpressError(500, error);

		}

	}

	/**	NOT USED: getAll(...)
	 *	Find all matching content records.
	 *	Optional: filter data in the form of `queryObject`.
	 *	=> [ QUERY_GENERAL_PROPERTIES, ...]
	 **/
	static async getAll(queryObject) {

		const sqlQueryBeforeWHERE = (`
			SELECT ${QUERY_GENERAL_PROPERTIES}
			FROM ${this.relationName}`);
		const sqlQueryAfterWHERE = (`ORDER BY date_published`);
		
		let result;
		const queryObjectLength = Object.keys(queryObject).length || 0;

		if(queryObjectLength){
			
			if(queryObject.title)
				queryObject.title = `%${queryObject.title}%`

			const { parameterizedWHERE, whereParameters } = sqlFilterQueryBuilder(queryObject, JSON_SQL_QUERY_MAPPING);
			
			result = await db.query(`${sqlQueryBeforeWHERE} ${parameterizedWHERE} ${sqlQueryAfterWHERE}`, whereParameters);
				// todo (ignore): isnsert (status = 'published' OR status = 'legacy') HERE

		}else{
			result = await db.query(`${sqlQueryBeforeWHERE} ${sqlQueryAfterWHERE}`);
		}

		return result.rows;
	
	}

	/**	getAllPublic(...)
	 *	Find all matching content records.
	 *	Optional: filter data in the form of `queryObject`.
	 *	=> [ QUERY_GENERAL_PROPERTIES, ...]
	 **/
	static async getAllPublic(queryObject) {

		const sqlQueryBeforeWHERE = (`
			SELECT ${QUERY_GENERAL_PROPERTIES}
			FROM ${this.relationName}`);
		const sqlQueryAfterWHERE = (`ORDER BY date_published`);
		
		let result;
		const queryObjectLength = Object.keys(queryObject).length || 0;

		if(queryObjectLength){
			
			if(queryObject.title)
				queryObject.title = `%${queryObject.title}%`

			const { parameterizedWHERE, whereParameters } = sqlFilterQueryBuilder(queryObject, JSON_SQL_QUERY_MAPPING);
			
			result = await db.query(`${sqlQueryBeforeWHERE} ${parameterizedWHERE} AND (status = 'published' OR status = 'legacy') ${sqlQueryAfterWHERE}`, whereParameters);

		}else{
			result = await db.query(`${sqlQueryBeforeWHERE} WHERE (status = 'published' OR status = 'legacy') ${sqlQueryAfterWHERE}`);
		}

		return result.rows;
	
	}

	/**	getByPK(...)
	 *	Given a pk, return data about content records.
	 *
	 *	=> QUERY_GENERAL_PROPERTIES
	 *
	 *	Throws NotFoundError if content records not found.
	 **/
	static async getByPK(pk) {

		const result = await db.query(`
			SELECT ${QUERY_GENERAL_PROPERTIES}
				FROM ${this.relationName}
				WHERE id = $1`,
			[pk]
		);

		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`Cannot find ${this.relationName}: ${pk}`);

		return contentObject;

	}

	/**	getByPKPrivate(...)
	 *	Given a username, and is reference user, return full data.
	 *	
	 *	=> QUERY_GENERAL_PROPERTIES, QUERY_PRIVATE_PROPERTIES
	 */
	static async getByPKPrivate(pk) {
		
		// console.log('ENTER MODEL BODY ===================================');
		// console.log(`headersSent (\'Content.js\' ~217): ${res.headersSent}`);

		// console.log(`headersSent (\'Content.js: ~233\'): ${res.headersSent}`);
		const result = await db.query(`
			SELECT ${QUERY_GENERAL_PROPERTIES}, ${QUERY_PRIVATE_PROPERTIES}
				FROM ${this.relationName}
				WHERE id = $1`,
			[pk]);

		// console.log('QUERY COMPLETED ===================================');
		// console.log(`headersSent (\'Content.js: ~240\'): ${res.headersSent}`);

		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`Cannot find ${this.relationName}: ${pk}`);

		return contentObject;

	}

	//	Note: Design Decision Tree HERE:
	/**	update(...)
	 *	Update content records data with `updateRecordObject`.
	 *
	 *	This is for a partial update of a record; and it only changes provided ones.
	 *
	 *	`updateRecordObject` may include any of the following:
	 *		{ ... }
	 *
	 *	=> QUERY_GENERAL_PROPERTIES
	 *
	 *	Throws NotFoundError if not found.
	 *	@param {*} pk - the primary key
	 *	...
	 *	@param {object} updateRecordObject - data to update the primary key
	 */
	static async update(pk, updateRecordObject) {

		await this.getByPK(pk);
			// check existence

		// do something with `updateRecordObject` if necessary, i.e. remove certain properties that are forbidden to be updated or modify passed values
			// not the time to remove `isOwner` ._. just get it working

		const { parameterizedSET, setParameters } = sqlUpdateQueryBuilder(updateRecordObject, JSON_SQL_SET_MAPPING);
		const pkParameterIndex = "$".concat(setParameters.length + 1);

		const updateQuerySQL = `
			UPDATE ${this.relationName} 
				SET ${parameterizedSET} 
				WHERE id = ${pkParameterIndex} 
				RETURNING ${QUERY_GENERAL_PROPERTIES}, ${QUERY_PRIVATE_PROPERTIES}`;
		const result = await db.query(updateQuerySQL, [...setParameters, pk]);

		const contentObject = result.rows[0];

		//	Design Decision: Should the Join Descriptions be overwritten? Should
		// if(contentObject.status === ('open' || 'standby')){
	
		// 	db.await("BEGIN");
		// 	// update join descriptions
		// 	// insert the query builder to update the join models
		
		// 	db.await("COMMIT")

		// }

		return contentObject;

	}

	/**	NOT USED: delete(pk)
	 *	Delete content records from database by `pk`.
	 *
	 *	=> `{ id, title }`.
	 */
	static async delete(pk) {

		let result = await db.query(`
			DELETE
				FROM ${this.relationName}
				WHERE id = $1
				RETURNING id, title`,
			[pk]);

		const contentObject = result.rows[0];
		
		if (!contentObject)
			throw new NotFoundError(`Cannot find content with id: ${pk}`);

		return contentObject;

	}
	
/** */

	/**	DEPRECATED: updateSign(...)
	 *	...
	 */
	static async updateSign(contentID, username){

		const result = await db.query(`
			SELECT participants, contract_signed AS "contractSigned"
				FROM ${this.relationName}
				WHERE id = $1`,
			[contentID]);

		const contentObject = result.rows[0];

		const participants = JSON.parse(contentObject.participants);
			// double check username is in participants
		const userIsParticipant = participants.indexOf(username);
		if(userIsParticipant === -1)
			throw new UnauthorizedError('not a participant')	

		// toggle whehter or not it is signed
		const contractSigned = JSON.parse(contentObject.contractSigned);
		let newContract = [...contractSigned];

		const userIndex = contractSigned.indexOf(username);

		if(userIndex === -1){
			newContract.push(username);
		}else{
			newContract = newContract.filter((userID) => userID !== username);
		}

		// commit
		const commitResult = await db.query(`
			UPDATE ${this.relationName}
				SET contract_signed = $1
				WHERE content_id = $2
				RETURNING contract_signed AS "contractSigned"`, 
			[newContract, contentID]);
		
		return commitResult.rows[0].contractSigned;		

	}

	static async updatePublish(contentID){
		// lowpriority: ok so this `publishUpdate` is a single purpose method. it does NOT take a response body to update the partcipiants. all it does is set it to publish. this may be a bit confusing for userflow and lead to a bit of bugs.

		const result = await db.query(`
		SELECT participants, contract_signed AS "contractSigned"
			FROM ${this.relationName}
			WHERE id = $1 AND status = 'standby' OR status 'open'`, [contentID]);
			// lowpriority: really, don't have the time to make this proper. so therefore it is because `signUpdate` is deprecated for now.

		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`Cannot find valid content with id: ${contentID}.`);

		// double check it is all signed.
		const participants = JSON.parse(contentObject.participants);
		const contractSigned = JSON.parse(contentObject.contractSigned);

		// fail signing if `participants` not equal to `contractSigned`
		if(!checkArrayEquality(participants, contractSigned))
			throw new ExpressError(498, 'All participants must have signed the contract.');	
		
		try{

			await db.query('BEGIN');

			const contentPublishDate = new Date();

			const publishQuery = await db.query(`
				UPDATE ${this.relationName}
					SET status = $1, published_date = $2
					WHERE id = $3
					RETURNING content_id, participants, description`, 
				['published', contentPublishDate.toJSON(), contentID]);

			const { id, participants, description } = publishQuery.rows[0];
			// console.log(publishQuery.rows[0]);

			// const { stringfiedWHERE, stringifiedVALUES } = sqlJoinMultipleQueryBuilder_Configured([], participants, 'user_id = ', id, description);

			// if(stringifiedVALUES){
			// 	await db.query(`
			// 		INSERT INTO contents_users_join (user_id, content_id, description)
			// 			VALUES ${stringifiedVALUES};`);
			// 		// lowpriority:this only works for psql > 9.5
			// }
			
			// if(stringifiedWHERE){

			// }
			// 	// low priority, get the previous version 
			
			// lowpriority: the above is an attempt to address the foreseen UX confusion, but this is not the focus of the project for now.
			
			await db.query('COMMIT');

			return 'success';
		
		}catch(error){
			await db.query('ROLLBACK');
			throw new ExpressError(498, error)
		}

	}

	/**	getContentOwner(...)
	 *	Return the content owner from content records in the database.
	 *
	 *	=> `username`.
	 */
	 static async getContentOwner(pk) {

		let result = await db.query(`
			SELECT id, owner
				FROM ${this.relationName}
				WHERE id = $1`, 
			[pk]);

		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`Cannot find content with id: ${pk}.`);
		
		return contentObject.owner;

	}

	/**	getParticipants(...)
	 *	Return the participants from content records in the database.
	 *
	 *	=> `["username", ...]` (stringified array?).
	 */
	static async getParticipants(pk) {

		const result = await db.query(`
			SELECT participants, status, contract_type AS "contractType"
				FROM ${this.relationName}
				WHERE id = $1`, 
			[pk]);

		// under pure circumstances, the query would be:
		/*
		const result = await db.query(`
			SELECT participants 
				FROM ${this.relationName}
				WHERE id = $1`, 
			[pk]);
		*/
		//	however, since publish isn't fully fleshed out to detect a solo and update can freely change the content contractType, for now this is the best solution.
		//	further study: updateSign (by using the `standby` state, no one can change the contractType); equally, make it so the application disallows publishing a piece of content if participants.length > 1 && contractTYpe === `solo`
		//	further study: introduce the following array-like properties "editors" (that is a list of individuals to edit anything but contractType and signing for other users)
		//	further study: introduce 

		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`Cannot find content with id: ${pk}.`);

		return contentObject;

	}

}

module.exports = Content;