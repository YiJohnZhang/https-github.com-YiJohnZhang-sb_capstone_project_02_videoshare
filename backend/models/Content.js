const db = require('../database/db');
// const bcrypt = require("bcrypt");
const { sqlUpdateQueryBuilder, sqlFilterQueryBuilder } = require('../helpers/sqlQueryingHelper');
const {
	NotFoundError,
	BadRequestError
} = require('../modules/utilities');

// const { BCRYPT_WORK_FACTOR } = require("../config.js");
const generalQueryReturnProperties = `pk, property_one AS "propertyOne"`;
const setJSONSQLMapping = {
	propertyOne: 'property_one',
	/* ... */
}
const queryJSONSQLMapping = {
	/* ... */
}
	// Search for `relationName`, `modelName`, `pk`


/** Related functions for relationName. */
class ModelName {

	/**	Create modelName with data.
	 *
	 *	=> { ... }
	 *
	 *	Throws BadRequestError for duplicates.
	 **/
	static async create({  }){

		// const modelExists = await db.query(
		// 	`SELECT pk
		// 	FROM relationName
		// 	WHERE pk = $1`,
		// 	[pk]
		// );

		// if (modelExists.rows[0])
		// 	throw new BadRequestError(`\'${pk}\' already exists.`);
			// for user-named models

		// const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
			// for users model

		const result = await db.query(
			`INSERT INTO relationName
				(, )
			VALUES ($1, )
			RETURNING ${generalQueryReturnProperties}`,
			[]
		);

		const modelnameObject = result.rows[0];

		return modelnameObject;

	}

	/**	Find all matchiing relationNames.
	 *	Optional: filter data in the form of `queryObject`.
	 *	=> [{ pk, propertyOne, ... }, ...]
	 **/
	static async getAll(queryObject) {

		const sqlQueryBeforeWHERE = (`
			SELECT ${generalQueryReturnProperties}
			FROM modelName
			`)
		const sqlQueryAfterWHERE = (`ORDER BY content_id`);
		
		let result;

		if(queryObject){

			// optional: do something to modify queryString

			const { parameterizedWHERE, whereParameters } = sqlFilterQueryBuilder(queryObject, queryJSONSQLMapping)
			result = await db.query(`${sqlQueryBeforeWHERE} ${parameterizedWHERE} ${sqlQueryAfterWHERE}`, whereParameters)

		}else{
			result = await db.query(`${sqlQueryBeforeWHERE} $sqlQueryAfterWHERE`)
		}

		return result.rows;
	
	}

	/**	Given a pk, return data about relationName.
	 *
	 *	=> { pk, ..., joinRelation }
	 *		where joinRelation is { ... }
	 *
	 *	Throws NotFoundError if relationName not found.
	 **/
	static async getByPK(pk) {

		const result = await db.query(
			`SELECT ${generalQueryReturnProperties}
			FROM relationName
			WHERE pk = $1`,
			[pk],
		);

		const modelnameObject = result.rows[0];

		if (!modelnameObject)
			throw new NotFoundError(`Cannot find relationName: ${pk}`);

		return modelnameObject;

	}

	/**	Update relationName data with `updateData`.
	 *
	 *	This is for a partial update of a record; and it only changes provided ones.
	 *
	 *	`updateData` may include any of the following:
	 *		{ ... }
	 *
	 *	=> { ... }
	 *
	 *	Throws NotFoundError if not found.
	 */
	static async update(pk, updateData) {

		await this.getByPK(pk);

		// do something with `updateData` if necessary

		const { parameterizedSET, setParameters } = sqlUpdateQueryBuilder(updateData, setJSONSQLMapping);
		const pkParameterIndex = "$".concat(setParameters.length + 1);

		const updateQuerySQL = `UPDATE relationName 
						SET ${parameterizedSET} 
						WHERE pk = ${pkParameterIndex} 
						RETURNING ${generalQueryReturnProperties}`;
		const result = await db.query(updateQuerySQL, [...setParameters, pk]);

		const modelnameObject = result.rows[0];
		delete modelnameObject.password;
		return modelnameObject;

	}

	/**	Delete relationName from database by `pk`.
	 *
	 *	=> `undefined`.
	 **/
	static async delete(pk) {

		let result = await db.query(
			`DELETE
				FROM relationName
				WHERE pk = $1
				RETURNING pk`,
			[pk],
		);

		const modelnameObject = result.rows[0];

		if (!modelnameObject)
			throw new NotFoundError(`No relationName: ${pk}`);

	}

}

module.exports = Content;