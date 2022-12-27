/**	useLocalStorage
 *	A hook to use `window.localStorage` to set cookies.
 *	@param {string} propertyKey - the name of the property key in localStorage.
 *	@param {*} [defaultValue = undefined] - the default value of `propertyKey` if not found in localStorage.
 *	@returns {[object, function]} - `propertyValue` the value corresponding to propertyKey; and `setProperty`, a function to update the value.
 */
function useLocalStorage(propertyKey, defaultValue = undefined){

	let propertyValue = localStorage.getItem(propertyKey) || defaultValue;

	/**	setProperty(propertyValue)
	 *	Set the value of the Local Storage `propertyKey` with `propertyValue`.
	 *	@param {*} newValue
	 */
	const setProperty = (newValue) => (localStorage.setItem(propertyKey, newValue));

	return [propertyValue, setProperty];

}

export default useLocalStorage;