import React from 'react';
import { render } from '@testing-library/react';
import EditUserPage from '../PageComponents/EditUserPage';

//	Smoke Test
test('EditUserPage: smoke test', () => {
	render(<EditUserPage />);
});

//	Snapshot Test
test('EditUserPage: snapshot', () => {

	const {asFragment} = render(<EditUserPage />);
	expect(asFragment()).toMatchSnapshot();

});

//	FireEvent Test
	// (usually ParentComponent only because it has access to state and all props)
// test('GenericComponent: ', () => {

// 	const {} = render(<GenericComponent />)
// 	const ...Element = queryBy...();

// 	// expect(queryByAltText('')).toBeInTheDocument();
// 	// expect(('')).toBeInTheDocument();

// });