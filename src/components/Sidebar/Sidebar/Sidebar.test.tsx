import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { componentRender } from 'lib/tests/componentRender';

describe('Sidebar', () => {
	test('Should render component', () => {
		componentRender(<Sidebar />);
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
	})

	test('Should toggle component', () => {
		componentRender(<Sidebar />);
		const button = screen.getByTestId('toggle-button');
		expect(button).toBeInTheDocument();
		fireEvent.click(button);
		expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
	})
})