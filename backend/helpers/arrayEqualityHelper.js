/** A helper module to check if the contents of two arrays are the same.
	*/

/**	checkArrayEquality(arr1, arr2)
 *	Are the two test arrays equal?
 *	=> boolean
 *	Returns whether or not the two arrays are equal, by content.
 *	@param {Array} testArray1 - the first array to compare against
 *	@param {Array} testArray2 - the second array to compare against
 *	@returns {boolean} isArraySame - are the two test arrays the same?
 */
function checkArrayEquality(testArray1 = [], testArray2 = []){

	if(!Array.isArray(testArray1) || !Array.isArray(testArray2))
		return false;
		// not an array type

	if(testArray1.length !== testArray2.length)
		return false;

	// optimizing for time.
	const array2Set = new Set(testArray2);

	const testArraysMatch = testArray1.reduce((previousValue, currentValue, index) => array2Set.has(testArray1[index]) && previousValue, true);

	return testArraysMatch;

}


module.exports = checkArrayEquality;