import { fireEvent, screen, waitFor } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import { TriangleSorter } from './TriangleSorter';

describe('TriangleSorter', () => {
	test('should render', () => {
		componentRender(
			<TriangleSorter
				sortField='price'
				activeTriangle='rank'
				setActiveTriangle={jest.fn()}
			/>,
		);
		expect(screen.getByTestId('sorter')).toBeInTheDocument();
	});

	test('should change sort', () => {
		componentRender(
			<TriangleSorter
				sortField='price'
				activeTriangle='rank'
				setActiveTriangle={jest.fn()}
			/>,
		);
		waitFor(() => fireEvent.click(screen.getByTestId('sorter')))
			.then(() => expect(window.location.href).toHaveTextContent('field=rank&by=ascending'));
	});

	test('should change sort direction', () => {
		componentRender(
			<TriangleSorter
				sortField='price'
				activeTriangle='rank'
				setActiveTriangle={jest.fn()}
			/>,
		);
		const sorter = screen.getByTestId('sorter');
		waitFor(() => fireEvent.click(sorter))
			.then(() => expect(window.location.href).toHaveTextContent('field=rank&by=ascending'))
			.then(() => fireEvent.click(sorter))
			.then(() => expect(window.location.href).toHaveTextContent('field=rank&by=descending'));
	});
});
