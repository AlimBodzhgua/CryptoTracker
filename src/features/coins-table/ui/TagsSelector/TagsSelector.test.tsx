import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender';
import { TagsSelector, TagList } from './TagsSelector';

describe('TagsSelector', () => {
	test('Component should render', () => {
		componentRender(<TagsSelector />);
		expect(screen.getByTestId('tags-selector')).toBeInTheDocument();
	});

	test('Component should have options', () => {
		componentRender(<TagsSelector />);

		Object.values(TagList).forEach((tag) => {
			expect(screen.getByText(tag)).toBeInTheDocument();
		});
	});
});
