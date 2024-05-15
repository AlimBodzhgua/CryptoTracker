import { screen } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import { AppLink } from './AppLink';

describe('AppLink', () => {
	test('should render', () => {
		componentRender(<AppLink to='/'>home</AppLink>);
		expect(screen.getByText(/home/i)).toBeInTheDocument();
	});
});
