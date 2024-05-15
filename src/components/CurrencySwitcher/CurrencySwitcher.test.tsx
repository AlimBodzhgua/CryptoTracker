import { screen } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import { CurrencySwitcher } from './CurrencySwitcher';

describe('CurrencySwitcher', () => {
	test('Should render', () => {
		componentRender(<CurrencySwitcher />);
		expect(screen.getByTestId('currency-switcher')).toBeInTheDocument();
	});

	test('Should have options', () => {
		componentRender(<CurrencySwitcher />);
		const switcher = screen.getByTestId('currency-switcher');
		expect(switcher).toBeInTheDocument();
		expect(screen.getByText(/usd/i)).toBeInTheDocument();
		expect(screen.getByText(/eur/i)).toBeInTheDocument();
		expect(screen.getByText(/rub/i)).toBeInTheDocument();
	});
});
