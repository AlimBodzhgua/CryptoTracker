import { screen } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import { PriceNotationSelector } from './PriceNotationSelector';
import { NotationList } from './PriceNotationSelector';


describe('PriceNotationSelector', () => {
	test('Component should render', () => {
		componentRender(<PriceNotationSelector />);
		expect(screen.getByTestId('price-selector')).toBeInTheDocument();
	});

	test('Component should have options', () => {
		componentRender(<PriceNotationSelector />);

		Object.values(NotationList).forEach((notation) => {
			expect(screen.getByText(notation)).toBeInTheDocument();
		})
	});
})