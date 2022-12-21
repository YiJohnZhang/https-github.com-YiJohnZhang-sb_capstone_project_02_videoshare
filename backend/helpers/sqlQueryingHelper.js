/**	A helper module to build parameterized queries for `SET` and `WHERE` partial queries.
	*/

const { BadRequestError } = require('../modules/utilities');

/**	sqlForPartialUpdate(updateData, jsSQLMapping)
 *	=>	{ parameterizedSET, setParameters }
 *	Generates a SQL parameterized query string and corresponding array of parameters based on the data, `dataToUpdate`, passed in with `jsSQLMapping` that maps the JavaScript object keys to corresponding SQL property names.
 *	Purposed for updating, `SET` queries.
*/
function sqlUpdateQueryBuilder(updateData, jsSQLMapping) {

	const keys = Object.keys(updateData);
	if (keys.length === 0)
		throw new BadRequestError("No data.");

	// { propertyOne: property1Value, propertyTwo: property2Value } => ['"propertyOne"=$1', '"propertyTwo"=$2']
	const columns = keys.map((columnName, index) =>
		`"${jsSQLMapping[columnName] || columnName}"=$${index + 1}`,
	);

	return {
		parameterizedSET: columns.join(", "),
		setParameters: Object.values(updateData),
	};

}

/**	sqlFilterQueryBuilder(filterData, jsSQLMapping)
 *	=>	{ parameterizedWHERE, whereParameters }
 *	Generates a SQL parameterized query string and corresponding array of parameters based on the data, `filterData`, passed in with `jsSQLMapping` that maps the JavaScript object keys to corresponding SQL property names.
 *	Purposed for filtering, `WHERE`, queries.
 *	This method allows `filterData` to be empty.
*/
function sqlFilterQueryBuilder(filterData, jsSQLMapping) {

	const keys = Object.keys(filterData);
	if (keys.length === 0)
		return;

	const queryArray = keys.map((key, index) => `${jsSQLMapping[key]} $${index+1}`);

	return {
		parameterizedWHERE: `WHERE ${queryArray.join(' AND ')}`,
		whereParameters: Object.values(filterData)
	};

}

module.exports = { sqlUpdateQueryBuilder, sqlFilterQueryBuilder };