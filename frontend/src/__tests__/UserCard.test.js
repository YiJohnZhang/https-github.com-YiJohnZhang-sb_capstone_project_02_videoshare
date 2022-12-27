import React from 'react';
import { render } from '@testing-library/react';
import UserCard from '../UserCard';

//	Smoke Test
test('UserCard: smoke test', () => {
	render(<UserCard />);
});

//	Snapshot Test
test('UserCard: snapshot', () => {

	const {asFragment} = render(<UserCard />);
	expect(asFragment()).toMatchSnapshot();

});

//