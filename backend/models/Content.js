const db = require('../database/db');
const { sqlCreateQueryBuilder, sqlFilterQueryBuilder, sqlUpdateQueryBuilder } = require('../helpers/sqlQueryingHelper');

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
	username: 'title ILIKE'
}



/** Related functions for Content. */
class Content {

	static relationName = 'contents';

	/**	Create content with data.
	 *
	 *	=> { ... }
	 *
	 *	Throws BadRequestError for duplicates.
	 **/
	 static async create(newRecordObject){

		try{

			const { parameterizedINSERTPropertyNames, parameterizedINSERTPropertyIndices, insertParameters } = sqlCreateQueryBuilder(newRecordObject, JSON_SQL_SET_MAPPING);

			const result = await db.query(`
				INSERT INTO ${this.relationName} ${parameterizedINSERTPropertyNames}
					VALUES ${parameterizedINSERTPropertyIndices}
					RETURNING ${QUERY_GENERAL_PROPERTIES}`, insertParameters);

			const modelNameObject = result.rows[0];
			return modelNameObject;

		}catch(error){
			throw new ConflictError(`${error}`);
		}

	}

	/**	Find all matching content records.
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
				// todo (ignore): isnsert (status = 'published' OR status = 'legacy') JERE

		}else{
			result = await db.query(`${sqlQueryBeforeWHERE} ${sqlQueryAfterWHERE}`);
		}

		return result.rows;
	
	}

	/**	Given a pk, return data about content records.
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

	/**	Given a username, and is reference user, return full data.
	 *	
	 *	=> QUERY_GENERAL_PROPERTIES, QUERY_PRIVATE_PROPERTIES
	 */
	static async getByPKPrivate(pk) {

		const result = await db.query(`
			SELECT ${QUERY_GENERAL_PROPERTIES}, ${QUERY_PRIVATE_PROPERTIES}
				FROM ${this.relationName}
				WHERE id = $1`,
			[pk]
		);

		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`Cannot find ${this.relationName}: ${pk}`);

		return contentObject;

	}

	/**	Update content records data with `updateRecordObject`.
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

		// do something with `updateRecordObject` if necessary, i.e. remove certain properties that are forbidden to be updated or modify passed values
			// not the time to remove `isOwner` ._. just get it working

		const { parameterizedSET, setParameters } = sqlUpdateQueryBuilder(updateRecordObject, JSON_SQL_SET_MAPPING);
		const pkParameterIndex = "$".concat(setParameters.length + 1);

		const updateQuerySQL = `
			UPDATE ${this.relationName} 
				SET ${parameterizedSET} 
				WHERE id = ${pkParameterIndex} 
				RETURNING ${QUERY_GENERAL_PROPERTIES}`;
		const result = await db.query(updateQuerySQL, [...setParameters, pk]);

		const contentObject = result.rows[0];
		return contentObject;

	}

	/**	Delete content records from database by `pk`.
	 *
	 *	=> `undefined`.
	 */
	// UNIMPLEMENTED: should this be for admins only to delete all instances or what?

/** */


	static async signUpdate(contentID, username){

		const result = await db.query(`
			SELECT participants, contract_signed AS "contractSigned"
				FROM ${this.relationName}
				WHERE id = $1`, [contentID]);

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
				RETURNING contract_signed AS "contractSigned"`, [newContract, contentID]);
		
		return commitResult.rows[0].contractSigned;		

	}

	// double check it is all signed.
	static async publishUpdate(contentID){

		const result = await db.query(`
		SELECT participants, contract_signed AS "contractSigned"
			FROM ${this.relationName}
			WHERE id = $1 AND status = 'standby'`, [contentID]);

		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`Cannot find valid content with id: ${contentID}.`);

		const participants = JSON.parse(contentObject.participants);
		const contractSigned = JSON.parse(contentObject.contractSigned);

		// fail signing if `participants` not equal to `contractSigned`
		if(participants != contractSigned)
			throw new ExpressError(499, 'All participants must have signed the contract.');	
		
		try{

			await db.query('BEGIN');

			const publishQuery = await db.query(`
				UPDATE ${this.relationName}
					SET status = $1
					WHERE content_id = $2
					RETURNING content_id`, ['published', contentID]);

			const parameterizedVALUES_array = participants.map((participant, index) => `($${3+index}, $1, $2))`);

			let parameterizedVALUES_string = parameterizedVALUES_array.join(',');

			const createContentUserJoinEntriesQuery = await db.query(`
				INSERT INTO contents_users_join (user_id, content_id, description)
					VALUES ${parameterizedVALUES_string};`, [contentID, description, ...participants])
			
			await db.query('COMMIT');

			return 'success';
		
		}catch(error){
			throw new ExpressError(498, error)
		}

	}

	/**	Return the content owner from content records in the database.
	 *
	 *	=> `username`.
	 */
	 static async getContentOwner(pk) {

		let result = await db.query(`
			SELECT id, owner
				FROM ${this.relationName}
				WHERE id = $1`, [pk]);

		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`Cannot find content with id: ${pk}.`);
		
		return contentObject.owner;

	}

	/**	Return the participants from content records in the database.
	 *
	 *	=> `["username", ...]` (stringified array?).
	 */
	static async getParticipants(pk) {

		let result = await db.query(`
			SELECT participants
				FROM ${this.relationName}
				WHERE id = $1`, [pk]);

		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`Cannot find content with id: ${pk}.`);
		
		const participantArray = JSON.parse(contentObject.participants);

		return participantArray;

	}

	/**	Return all content by queried username.
	 *
	 *	{ username } => [ { id, description }, ... ].
	 */
	static async getContentByUsername(username) {

		let result = await db.query(`
			SELECT content_id, description
				FROM contents_users_join
				WHERE user_id = $1`, [username]);

		const contentList = result.rows;

		return contentList;

	}

	// TODO: DELETE
	/**	Return the JOIN entry of content given a username.
	 *
	 *	{ username } => [ { id, description }, ... ].
	 *
	 *	Throws NotFoundError if not found.
	 */
	static async getJOINContent(username, contentID) {

		let result = await db.query(`
			SELECT content_id, description
				FROM contents_users_join
					JOIN ${this.relationName}
				WHERE user_id = $1 AND content_id = $2`, [username, contentID]);
			// publicly only return active ones (status = 'active')?
				
		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`Cannot find content with: (${username}, ${contentID}).`);

		return contentObject;

	}

	// TODO: DELETE
	/**	Return the JOIN entry of content given a username, to edit.
	 *
	 *	{ username } => [ { id, description }, ... ].
	 *
	 *	Throws NotFoundError if not found.
	 */
	static async getPrivateJOINContent(username, contentID) {

		let result = await db.query(`
			SELECT content_id, description
				FROM contents_users_join
				WHERE user_id = $1 AND content_id = $2`, [username, contentID]);

		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`Cannot find content with: (${username}, ${contentID}).`);

		return contentObject;

	}

	// TODO: DELETE
	/**	Update the JOIN entry of content given a username.
	 *
	 *	{ username, contentID } => [ { id, description }, ... ].
	 *
	 *	Throws NotFoundError if not found.
	 */
	static async updateJOINContent(username, contentID, { description }) {

		let result = await db.query(`
			UPDATE contents_users_join
				SET description = $1
				WHERE user_id = $2 AND content_id = $3
				RETURNING content_id`, [description, username, contentID]);
				
		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`Cannot find content with: (${username}, ${contentID}).`);

		return contentObject;

	}

}

module.exports = Content;