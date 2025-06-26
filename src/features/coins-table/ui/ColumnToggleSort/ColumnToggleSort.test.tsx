import { fireEvent, screen, waitFor } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender';
import { ColumnToggleSort } from './ColumnToggleSort';

describe('TriangleSorter', () => {
	test('should render', () => {
		componentRender(
			<ColumnToggleSort
				title='price'
				sortField='price'
				activeField='rank'
				onActiveFieldChange={jest.fn()}
			/>,
		);
		expect(screen.getByTestId('sorter')).toBeInTheDocument();
	});

	test('should change sort', () => {
		componentRender(
			<ColumnToggleSort
				title='price'
				sortField='price'
				activeField='rank'
				onActiveFieldChange={jest.fn()}
			/>,
		);
		waitFor(() => fireEvent.click(screen.getByTestId('sorter')))
			.then(() => expect(window.location.href).toHaveTextContent('field=rank&by=ascending'));
	});

	test('should change sort direction', () => {
		componentRender(
			<ColumnToggleSort
				title='price'
				sortField='price'
				activeField='rank'
				onActiveFieldChange={jest.fn()}
			/>,
		);
		const sorter = screen.getByTestId('sorter');
		waitFor(() => fireEvent.click(sorter))
			.then(() => expect(window.location.href).toHaveTextContent('field=rank&by=ascending'))
			.then(() => fireEvent.click(sorter))
			.then(() => expect(window.location.href).toHaveTextContent('field=rank&by=descending'));
	});
});
