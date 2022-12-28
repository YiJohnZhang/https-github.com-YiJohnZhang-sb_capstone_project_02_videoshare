const db = require('../database/db');
const { sqlCreateQueryBuilder, sqlFilterQueryBuilder, sqlUpdateQueryBuilder } = require('../helpers/sqlQueryingHelper');
const {
	NotFoundError,
	BadRequestError,
	ConflictError
} = require('../modules/utilities');

//	Properties to return for a query
const QUERY_GENERAL_PROPERTIES = `
	pk,
	property_one AS "propertyOne",
	date_published AS "datePublished"`;
const QUERY_PRIVATE_PROPERTIES = 'private_property AS "privateProperty", ...';

//	JSON-SQL Mapping Constants
const JSON_SQL_SET_MAPPING = {
	propertyOne: 'property_one',
	/* ... */
}
const JSON_SQL_QUERY_MAPPING = {
	/* ... */
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

		const contentExists = await db.query(`
			SELECT id
				FROM ${this.relationName}
				WHERE id = $1`, [id]);

		if (contentExists.rows[0])
			throw new BadRequestError(`\'${id}\' already exists.`);

		try{

			const { parameterizedINSERTPropertyNames, parameterizedINSERTPropertyIndices, insertParameters } = sqlCreateQueryBuilder(newRecordObject, JSON_SQL_SET_MAPPING);

			const result = await db.query(
				`INSERT INTO ${this.relationName}
					${parameterizedINSERTPropertyNames}
				VALUES ${parameterizedINSERTPropertyIndices}
				RETURNING ${QUERY_GENERAL_PROPERTIES}`,
				[insertParameters]
			);

			const contentObject = result.rows[0];
			return contentObject;

		}catch(error){
			throw new ConflictError(`${error}`)
		}

	}

	/**	Find all matchiing relationName.
	 *	Optional: filter data in the form of `queryObject`.
	 *	=> [{ pk, propertyOne, ... }, ...]
	 **/
	static async getAll(queryObject) {

		const sqlQueryBeforeWHERE = (`
			SELECT ${QUERY_GENERAL_PROPERTIES}
			FROM ${this.relationName}`);
		const sqlQueryAfterWHERE = (`ORDER BY date_published`);
		
		let result;

		if(queryObject){

			// optional: do something to modify queryString

			const { parameterizedWHERE, whereParameters } = sqlFilterQueryBuilder(queryObject, JSON_SQL_QUERY_MAPPING);
			result = await db.query(`${sqlQueryBeforeWHERE} ${parameterizedWHERE} ${sqlQueryAfterWHERE}`, whereParameters);

		}else{
			result = await db.query(`${sqlQueryBeforeWHERE} ${sqlQueryAfterWHERE}`);
		}

		return result.rows;
	
	}

	/**	Given a pk, return data about relationName.
	 *
	 *	=> { pk, ... }
	 *
	 *	Throws NotFoundError if relationName not found.
	 **/
	static async getByPK(pk) {

		const result = await db.query(`
			SELECT ${QUERY_GENERAL_PROPERTIES}
				FROM ${this.relationName}
				WHERE pk = $1`,
			[pk]
		);

		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`Cannot find ${this.relationName}: ${pk}`);

		return contentObject;

	}

	/**	Given a username, and is reference user, return full data.
	 *	
	 *	=> { pk, ..., }
	 /
	 */
	static async getByPKPrivate(username) {

		const result = await db.query(`
			SELECT ${QUERY_GENERAL_PROPERTIES}, ${QUERY_PRIVATE_PROPERTIES}
				FROM ${this.relationName}
				WHERE pk = $1`,
			[pk]
		);

		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`Cannot find ${this.relationName}: ${pk}`);

		return contentObject;

	}

	/**	Update relationName data with `updateRecordObject`.
	 *
	 *	This is for a partial update of a record; and it only changes provided ones.
	 *
	 *	`updateRecordObject` may include any of the following:
	 *		{ ... }
	 *
	 *	=> { ... }
	 *
	 *	Throws NotFoundError if not found.
	 *	@param {*} pk - the primary key
	 *	...
	 *	@param {object} updateRecordObject - data to update the primary key
	 */
	static async update(pk, updateRecordObject) {

		await this.getByPK(pk);

		// do something with `updateRecordObject` if necessary, i.e. remove certain properties that are forbidden to be updated or modify passed values

		const { parameterizedSET, setParameters } = sqlUpdateQueryBuilder(updateRecordObject, JSON_SQL_SET_MAPPING);
		const pkParameterIndex = "$".concat(setParameters.length + 1);

		const updateQuerySQL = `
					UPDATE ${this.relationName} 
						SET ${parameterizedSET} 
						WHERE pk = ${pkParameterIndex} 
						RETURNING ${QUERY_GENERAL_PROPERTIES}`;
		const result = await db.query(updateQuerySQL, [...setParameters, pk]);

		const contentObject = result.rows[0];
		delete contentObject.password;
		return contentObject;

	}

	/**	Delete relationName from database by `pk`.
	 *
	 *	=> `undefined`.
	 **/
	static async delete(pk) {

		let result = await db.query(`
			DELETE
				FROM ${this.relationName}
				WHERE pk = $1
				RETURNING pk`,
			[pk],
		);

		const contentObject = result.rows[0];

		if (!contentObject)
			throw new NotFoundError(`No ${this.relationName}: ${pk}`);

	}

}

module.exports = Content;