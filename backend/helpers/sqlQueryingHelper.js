/**	A helper module to build parameterized queries for `SET` and `WHERE` partial queries.
	*/

const { BadRequestError } = require('../modules/utilities');

/**	sqlCreateQueryBuilder(createData, jsonSQLMapping)
 *	=>	{ parameterizedINSERTPropertyNames, parameterizedINSERTPropertyIndices, insertParameters }
 *	Generates a SQL parameterized query string and corresponding array of parameters based on the data, `createData`, passed in with `jsonSQLMapping` that maps the JavaScript object keys to corresponding SQL property names.
 *	Purposed for creating, `INSERT INTO`, queries.
 *	@param {object} filterData - filter data object
 *	@param {object} [jsonSQLMapping = {}] - corresponding JSON-SQL property WHERE mapping object
 *	@returns {parameterizedINSERTPropertyNames: string, parameterizedINSERTPropertyIndices: string, insertParameters: Array}
 *		- `parameterizedINSERTPropertyNames`: a concatenated string of `property_name, property_name2, ... `
 *		- `parameterizedINSERTPropertyIndices`: a concatentated string of index corresponding to `parameterizedINSERTPropertyNames`, `$x, $x+1, ...`
 *		- `insertParameters`: an array of values corresponding to the property_names
*/
function sqlCreateQueryBuilder(createData, jsonSQLMapping = {}){

	const keys = Object.keys(createData);
	const queryArray = keys.map((key) => jsonSQLMapping[key] || key);
	const indexArray = keys.map((key, index) => `$${index + 1}`)

	return {
		parameterizedINSERTPropertyNames: `(${queryArray.join(', ')})`,
		parameterizedINSERTPropertyIndices: `(${indexArray.join(', ')})`,
		insertParameters: Object.values(createData)
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

	if (!filterData)
		return;
	const keys = Object.keys(filterData);

	const queryArray = keys.map((key, index) => `${jsonSQLMapping[key]} $${index+1}`);

	return {
		parameterizedWHERE: `WHERE ${queryArray.join(' AND ')}`,
		whereParameters: Object.values(filterData)
	}

}

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

	if (!updateData)
		throw new BadRequestError("No data.");
	const keys = Object.keys(updateData);

	// { propertyOne: property1Value, propertyTwo: property2Value } => ['"propertyOne"=$1', '"propertyTwo"=$2']
	const columns = keys.map((columnName, index) =>
		`"${jsonSQLMapping[columnName] || columnName}"=$${index + 1}`,
	);

	return {
		parameterizedSET: columns.join(", "),
		setParameters: Object.values(updateData)
	}

}

// /**	sqlMultipleInsertsQueryBuilder()
//  *	Out of scope for now
//  *	@param {Array} forEachArray - 
//  *	@param {*} propertyOne - 
//  *	@param {*} propertyTwo - 
//  *	@returns {string} - queryLiteral
//  */
// function sqlMultipleInsertsQueryBuilder(){

// }

// /**	sqlMultipleRemoveQueryBuilder()
//  *	Out of scope for now
//  *	@param {Array} forEachArray - 
//  *	@param {*} propertyOne - 
//  *	@param {*} propertyTwo - 
//  *	@returns {string} - queryLiteral
//  */
// function sqlMultipleRemoveQueryBuilder(){

// }

// /**	sqlMultipleInsertsConfiguredQueryBuilder()
//  *	2023-01-02 Note: Special built for `Content.create()`, `Content.()` for now.
//  *	@param {Array} forEachArray - 
//  *	@param {*} propertyOne - 
//  *	@param {*} propertyTwo - 
//  *	@returns {string} - queryLiteral 
//  */
// function sqlMultipleInsertsConfiguredQueryBuilder(forEachArray, propertyOne, propertyTwo){

// 	const 

// 	return;
// }

// /**	sqlMultipleRemoveConfiguredQueryBuilder()
//  *	2023-01-02 Note: Special built for `Content.update()`, `Content.()` for now. Returns `false` if reference array is the same.
//  *	Note this does NOT handle inserts.
//  *	it is the `WHERE` clause
//  *	@param {Array} referenceArray - before
//  *	@param {Array} truncatedArray - after
//  *	@param {string} propertyMatcher - 
//  *	@returns {string} - deleteString 
//  */
// function sqlMultipleRemoveConfiguredQueryBuilder(referenceArray, truncatedArray, propertyMatcher){

// 	// note referenceArray must s.t. [[...truncatedArray], ...]

// 	let deleteArray = [];
// 	let truncatedSet = new Set(truncatedArray);

// 	referenceArray.forEach((element) => {

// 		if(!truncatedSet.has(element))
// 			deleteArray.push(`${propertyMatcher} ${element}`);

// 	})

// 	if(deleteArray.length === 0)
// 		return false;

// 	const deleteString = deleteArray.join(' OR ');
// 	return deleteArray;

// }

// idea: make a method that can handle both, it needs a `referenceArray` and `newArray`. not now though every minutes counts .__________.

/**	sqlJoinMultipleQueryBuilder_Configured()
 *	2023-01-02 Note: Special built for `Content.update()`, `Content.()` for now. Returns `false` if reference array is the same.
 *	Note this does NOT handle inserts.
 *	it is the `WHERE` clause
 *	@param {Array} referenceArray - before
 *	@param {Array} newArray - after
 *	@param {string} WHEREPropertyMatcher - int his configured case 'user_id = '
 *	@param {*} propertyOne - in this configured case, content ID
 *	@param {*} insertPropertyTwo - in this configured case, description
 *	@returns {string|boolean} stringifiedWHERE - string for `DELETE`sql / `UPDATE`sql
 *	@returns {string|boolean} stringifiedVALUES - string for `INSERT INTO`slq
 */
function sqlJoinMultipleQueryBuilder_Configured(referenceArray, newArray, WHEREPropertyMatcher, propertyOne, insertPropertyTwo){

	// note referenceArray must s.t. [[...truncatedArray], ...]

	// ...`WHERE`sql Aspect
	let whereArray = [];
	let newSet = new Set(newArray);

	if(referenceArray){

		referenceArray.forEach((element) => {

			if(!newSet.has(element)){
			
				if(propertyOne !== null){
					
					whereArray.push(`(${WHEREPropertyMatcher}'${element}' AND content_id = '${propertyOne}')`);
				
				}else{
					
					whereArray.push(`${WHEREPropertyMatcher}'${element}'`);

				}
			
			
			}

		});

	}

	const stringifiedWHERE = whereArray.length === 0 ? false : `WHERE ${whereArray.join(' OR ')}`;

	// ...`VALUES`sql Aspect
	let valuesArray = [];
	let referenceSet = new Set(referenceArray);

	if(newArray){

		newArray.forEach((element) => {

			if(!referenceSet.has(element))
				valuesArray.push(`('${element}', ${propertyOne}, '${insertPropertyTwo}')`)

		});
		
	}

	const stringifiedVALUES = valuesArray.length === 0 ? false : `VALUES ${valuesArray.join(', ')}`;

	return{
		stringifiedWHERE,
		stringifiedVALUES
	}

}

module.exports = { 
	sqlCreateQueryBuilder, 
	sqlFilterQueryBuilder, 
	sqlUpdateQueryBuilder, 
	sqlJoinMultipleQueryBuilder_Configured
}

// 	sqlMultipleInsertsQueryBuilder, 
// sqlMultipleRemoveQueryBuilder, 