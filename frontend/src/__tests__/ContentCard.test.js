import React from 'react';
import { render } from '@testing-library/react';
import ContentCard from '../DumbComponents/ContentCard';

//	Smoke Test
test('ContentCard: smoke test', () => {
	render(<ContentCard />);
});

//	Snapshot Test
test('ContentCard: snapshot', () => {

	const {asFragment} = render(<ContentCard />);
	expect(asFragment()).toMatchSnapshot();

});

//