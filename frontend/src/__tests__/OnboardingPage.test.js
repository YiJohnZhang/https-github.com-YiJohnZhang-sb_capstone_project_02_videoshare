import React from 'react';
import { render } from '@testing-library/react';
import OnboardingPage from '../OnboardingPage';

//	Smoke Test
test('OnboardingPage: smoke test', () => {
	render(<OnboardingPage />);
});

//	Snapshot Test
test('OnboardingPage: snapshot', () => {

	const {asFragment} = render(<OnboardingPage />);
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