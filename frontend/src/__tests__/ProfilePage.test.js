import React from 'react';
import { render } from '@testing-library/react';
import ProfilePage from '../ProfilePage';

//	Smoke Test
test('ProfilePage: smoke test', () => {
	render(<ProfilePage />);
});

//	Snapshot Test
test('ProfilePage: snapshot', () => {

	const {asFragment} = render(<ProfilePage />);
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