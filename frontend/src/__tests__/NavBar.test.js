import React from 'react';
import { render } from '@testing-library/react';
import NavBar from '../NavBar';

//	Smoke Test
test('NavBar: smoke test', () => {
	render(<NavBar />);
});

//	Snapshot Test
test('NavBar: snapshot', () => {

	const {asFragment} = render(<NavBar />);
	expect(asFragment()).toMatchSnapshot();

});

//