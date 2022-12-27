import React from 'react';
import { render } from '@testing-library/react';
import SearchPage from '../SearchPage';

//	Smoke Test
test('SearchPage: smoke test', () => {
	render(<SearchPage />);
});

//	Snapshot Test
test('SearchPage: snapshot', () => {

	const {asFragment} = render(<SearchPage />);
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