import React from 'react';
import { render } from '@testing-library/react';
import UploadPage from '../UploadPage';

//	Smoke Test
test('UploadPage: smoke test', () => {
	render(<UploadPage />);
});

//	Snapshot Test
test('UploadPage: snapshot', () => {

	const {asFragment} = render(<UploadPage />);
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