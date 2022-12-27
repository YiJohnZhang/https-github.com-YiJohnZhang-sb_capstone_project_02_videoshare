import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '../HomePage';

//	Smoke Test
test('HomePage: smoke test', () => {
	render(<HomePage />);
});

//	Snapshot Test
test('HomePage: snapshot', () => {

	const {asFragment} = render(<HomePage />);
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