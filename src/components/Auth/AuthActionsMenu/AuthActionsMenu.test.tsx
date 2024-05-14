import { screen } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import { AuthActionsMenu } from './AuthActionsMenu';


describe('AuthActionsMenu', () => {
	test('Component should render', () => {
		componentRender(<AuthActionsMenu />);
		expect(screen.getByTestId('auth-menu')).toBeInTheDocument();
	});

	test('User logged in', () => {
		componentRender(
			<AuthActionsMenu />,
			{initialState: {user: {authData: {}}}}
		);
		expect(screen.getByTestId('logout-button')).toBeInTheDocument();
	});

	test('User not logged in', () => {
		componentRender(<AuthActionsMenu />);
		expect(screen.getByTestId('signup-button')).toBeInTheDocument();
		expect(screen.getByTestId('login-button')).toBeInTheDocument();
	});
})