/**	A helper module to build parameterized queries for `SET` and `WHERE` partial queries.
	*/

const { BadRequestError } = require('../modules/utilities');

/**	sqlForPartialUpdate(updateData, jsonSQLMapping)
 *	=>	{ parameterizedSET, setParameters }
 *	Generates a SQL parameterized query string and corresponding array of parameters based on the data, `dataToUpdate`, passed in with `jsonSQLMapping` that maps the JavaScript object keys to corresponding SQL property names.
 *	Purposed for updating, `SET` queries.
 *	@param {object} updateData - update data object
 *	@param {object} [jsonSQLMapping = {}] - corresponding JSON-SQL property name mapping object
 *	@returns {parameterizedSET: string, setParameters: Array}
 *		- `parameterizedSET` is a concatenated string of `property_name = $x, property_name2 = $x+1, ...`
 *		- `setParameters` is an array of values corresponding to the property_names
*/
function sqlUpdateQueryBuilder(updateData, jsonSQLMapping = {}) {

	const keys = Object.keys(updateData);
	if (keys.length === 0)
		throw new BadRequestError("No data.");

	// { propertyOne: property1Value, propertyTwo: property2Value } => ['"propertyOne"=$1', '"propertyTwo"=$2']
	const columns = keys.map((columnName, index) =>
		`"${jsonSQLMapping[columnName] || columnName}"=$${index + 1}`,
	);

	return {
		parameterizedSET: columns.join(", "),
		setParameters: Object.values(updateData),
	}

}

/**	sqlFilterQueryBuilder(filterData, jsonSQLMapping)
 *	=>	{ parameterizedWHERE, whereParameters }
 *	Generates a SQL parameterized query string and corresponding array of parameters based on the data, `filterData`, passed in with `jsonSQLMapping` that maps the JavaScript object keys to corresponding SQL property names.
 *	Purposed for filtering, `WHERE`, queries.
 *	This method allows `filterData` to be empty.
 *	@param {object} filterData - filter data object
 *	@param {object} [jsonSQLMapping = {}] - corresponding JSON-SQL property WHERE mapping object
 *	@returns {parameterizedWHERE: string, whereParameters: Array}
 *		- `parameterizedWHERE` is a concatenated string of `property_name [SQL Matcher] $x AND property_name2 [SQL Matcher] $x+1 AND ...`
 *		- `whereParameters` is an array of values corresponding to the property_names
*/
function sqlFilterQueryBuilder(filterData, jsonSQLMapping = {}){

	const keys = Object.keys(filterData);
	if (keys.length === 0)
		return;

	const queryArray = keys.map((key, index) => `${jsonSQLMapping[key]} $${index+1}`);

	return {
		parameterizedWHERE: `WHERE ${queryArray.join(' AND ')}`,
		whereParameters: Object.values(filterData)
	}

}

/**	sqlCreateQueryBuilder(createData, jsonSQLMapping)
 *	=>	{ parameterizedINSERTPropertyNames, parameterizedINSERTPropertyIndices, insertParameters }
 *	Generates a SQL parameterized query string and corresponding array of parameters based on the data, `createData`, passed in with `jsonSQLMapping` that maps the JavaScript object keys to corresponding SQL property names.
 *	Purposed for creating, `INSERT INTO`, queries.
 *	@param {object} filterData - filter data object
 *	@param {object} [jsonSQLMapping = {}] - corresponding JSON-SQL property WHERE mapping object
 *	@returns {parameterizedINSERTPropertyNames: string, parameterizedINSERTPropertyIndices: string, insertParameters: Array}
 *		- `parameterizedWHERE` is a concatenated string of `property_name [SQL Matcher] $x AND property_name2 [SQL Matcher] $x+1 AND ...`
 *		- `whereParameters` is an array of values corresponding to the property_names
*/
function sqlCreateQueryBuilder(createData, jsonSQLMapping = {}){

	const keys = Object.keys(createData);
	const queryArray = keys.map((key) => jsonSQLMapping[key] || key);
	const indexArray = keys.map((index) => `$${index + 1}`)

	return {
		parameterizedINSERTPropertyNames: `(${queryArray.join(', ')})`,
		parameterizedINSERTPropertyIndices: `(${indexArray.join(', ')})`,
		insertParameters: Object.values(createData);
	}

}

module.exports = { sqlCreateQueryBuilder, sqlFilterQueryBuilder, sqlUpdateQueryBuilder }