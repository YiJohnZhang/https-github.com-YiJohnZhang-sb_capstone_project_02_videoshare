import React from 'react';
import { render } from '@testing-library/react';
import EditContentPage from '../PageComponents/EditContentPage';

//	Smoke Test
test('EditContentPage: smoke test', () => {
	render(<EditContentPage />);
});

//	Snapshot Test
test('EditContentPage: snapshot', () => {

	const {asFragment} = render(<EditContentPage />);
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