import React from 'react';
import { render } from '@testing-library/react';
import ErrorPage from '../PageComponents/ErrorPage';

//	Smoke Test
test('ErrorPage: smoke test', () => {
	render(<ErrorPage />);
});

//	Snapshot Test
test('ErrorPage: snapshot', () => {

	const {asFragment} = render(<ErrorPage />);
	expect(asFragment()).toMatchSnapshot();

});