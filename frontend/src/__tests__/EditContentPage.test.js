import React from 'react';
import { render } from '@testing-library/react';
import ContentPage from '../EditContentPage';

//	Smoke Test
test('ContentPage: smoke test', () => {
	render(<ContentPage />);
});

//	Snapshot Test
test('ContentPage: snapshot', () => {

	const {asFragment} = render(<ContentPage />);
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