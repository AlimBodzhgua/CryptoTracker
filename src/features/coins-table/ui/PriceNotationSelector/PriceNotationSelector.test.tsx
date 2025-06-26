import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender';
import { PriceNotationSelector, NotationList } from './PriceNotationSelector';

describe('PriceNotationSelector', () => {
	test('Component should render', () => {
		componentRender(<PriceNotationSelector />);
		expect(screen.getByTestId('price-selector')).toBeInTheDocument();
	});

	test('Component should have options', () => {
		componentRender(<PriceNotationSelector />);

		Object.values(NotationList).forEach((notation) => {
			expect(screen.getByText(notation)).toBeInTheDocument();
		});
	});
});
