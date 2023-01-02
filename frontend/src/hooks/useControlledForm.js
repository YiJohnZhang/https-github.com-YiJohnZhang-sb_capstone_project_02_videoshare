import { useState } from 'react';

/**	useControlledForm
 *	A hook to use a controlled React form.
 *	@param {object} INITIAL_FORM_STATE - set the initial form state, property/key => form element name, value => form element value
 *	@returns {[object, function, function, function]} formState, updateFormState(), resetFormState(), overwriteForm()
 */
function useControlledForm(INITIAL_FORM_STATE){

	const [formState, setFormState] = useState(INITIAL_FORM_STATE);

	/**	updateFormState
	 *	Update the form state.
	 *	@param {*} formName - form input name
	 *	@param {*} formValue - corresponding value
	 */
	function updateFormState(formName, formValue){

		const newFormState = {
			...formState, 
			[formName]: formValue	
		}

		setFormState(newFormState);

	}

	/**	overwriteForm
	 *	Reset form state to the initial form state passed, i.e. on submit.
	 */
	 function resetFormState(){

		setFormState(INITIAL_FORM_STATE);

	}

	/**	overwriteForm
	 *	Overwrites current `formState` with a new object corresponding to the form
	 *	@param {object} newFormObject
	 */
	function overwriteFormState(newFormObject){

		setFormState(newFormObject);

	}

	return [formState, updateFormState, resetFormState, overwriteFormState];
		// later: formic form validation

}

export default useControlledForm;