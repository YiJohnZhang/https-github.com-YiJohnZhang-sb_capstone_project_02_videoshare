const db = require('../database/db');
const { NotFoundError } = require('../modules/utilities');

//	Properties to return for a query
const QUERY_GENERAL_PROPERTIES = `user_id AS "userID", role_id as "roleID"`;
const QUERY_PRIVATE_PROPERTIES = ``;

//	JSON-SQL Mapping Constants
const JSON_SQL_SET_MAPPING = {
	userID: 'user_id',
	roleID: 'role_id'
}
const JSON_SQL_QUERY_MAPPING = {
	userID: 'user_id =' ,
	roleID: 'role_id ='
}

/** Related functions for RoleUserJoin. */
class RoleUserJoin {

	static relationName = 'roles_users_join';

	/**	Given a pk (composite pk), return data about roles_users_join records.
	 *
	 *	(userID, roleID ) => { userID, ... }
	 *
	 *	Throws NotFoundError if roles_users_join record not found.
	 **/
	static async getByPK(userID, roleID) {

		const result = await db.query(`
			SELECT ${QUERY_GENERAL_PROPERTIES}
				FROM ${this.relationName}
				WHERE user_id = $1 AND role_id = $2`, [userID, roleID]);

		const cuJoinObject = result.rows[0];

		if (!cuJoinObject)
			throw new NotFoundError(`Cannot find ${this.relationName}: (${userID}, ${roleID})`);

		return cuJoinObject;

	}

}

module.exports = RoleUserJoin;