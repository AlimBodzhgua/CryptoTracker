import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import { LangSwitcher } from './LangSwitcher';


describe('LangSwitcher', () => {
	test('Component should render', () => {
		componentRender(<LangSwitcher />);
		expect(screen.getByTestId('switch-button')).toBeInTheDocument();
	});

	test('Component should change after click', () => {
		componentRender(<LangSwitcher />);
		fireEvent.click(screen.getByTestId('switch-button'));

		expect(screen.getByText(/ru/i)).toHaveClass('activeRu');
		expect(screen.getByText(/en/i)).toHaveClass('inactiveEn');		
	});
})