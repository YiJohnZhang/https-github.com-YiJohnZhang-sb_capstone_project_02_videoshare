import React from 'react';
import { render } from '@testing-library/react';
import ContentPage from '../PageComponents/ContentPage';

//	Smoke Test
test('ContentPage: smoke test', () => {
	render(<ContentPage />);
});

//	Snapshot Test
test('ContentPage: snapshot', () => {

	const {asFragment} = render(<ContentPage />);
	expect(asFragment()).toMatchSnapshot();

});