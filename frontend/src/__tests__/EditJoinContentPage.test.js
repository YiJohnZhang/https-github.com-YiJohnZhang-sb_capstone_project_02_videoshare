import React from 'react';
import { render } from '@testing-library/react';
import EditJoinContentPage from '../PageComponents/EditJoinContentPage';

//	Smoke Test
test('EditJoinContentPage: smoke test', () => {
	render(<EditJoinContentPage />);
});

//	Snapshot Test
test('EditJoinContentPage: snapshot', () => {

	const {asFragment} = render(<EditJoinContentPage />);
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