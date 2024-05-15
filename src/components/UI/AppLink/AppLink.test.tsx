import { screen } from '@testing-library/react';
import { AppLink } from './AppLink';
import { componentRender } from 'lib/tests/componentRender';


describe('AppLink', () => {
	test('should render', () => {
		componentRender(<AppLink to='/'>home</AppLink>);
		expect(screen.getByText(/home/i)).toBeInTheDocument();
	});
})