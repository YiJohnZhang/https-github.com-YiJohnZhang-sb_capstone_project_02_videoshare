import React from 'react';
import { render } from '@testing-library/react';
import NotFoundPage from '../NotFoundPage';

//	Smoke Test
test('NotFoundPage: smoke test', () => {
	render(<NotFoundPage />);
});

//	Snapshot Test
test('NotFoundPage: snapshot', () => {

	const {asFragment} = render(<NotFoundPage />);
	expect(asFragment()).toMatchSnapshot();

});