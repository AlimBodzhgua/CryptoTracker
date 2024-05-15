import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import { Modal } from './Modal';

describe('Modal', () => {
	test('Component should render', () => {
		componentRender(
			<Modal
				isOpen
				onClose={jest.fn()}
				children={<div>children</div>}
			/>,
		);
		expect(screen.getByTestId('modal')).toBeInTheDocument();
	});

	test('Modal should be opened', () => {
		componentRender(
			<Modal
				isOpen
				onClose={jest.fn()}
				children={<div>children</div>}
			/>,
		);
		expect(screen.getByTestId('modal')).toHaveClass('opened');
	});

	test('Modal should close on click', () => {
		const onClose = jest.fn();
		componentRender(
			<Modal
				isOpen
				onClose={onClose}
				children={<div>children</div>}
			/>,
		);
		fireEvent.click(screen.getByTestId('modal'));
		expect(onClose).toHaveBeenCalled();
	});

	test('Modal should close on keydown', () => {
		const onClose = jest.fn();
		componentRender(
			<Modal
				isOpen
				onClose={onClose}
				children={<div>children</div>}
			/>,
		);
		fireEvent.keyDown(screen.getByTestId('modal'), {
			key: 'Escape',
			code: 'Escape',
			keyCode: 27,
			charCode: 27,
		});
		expect(onClose).toHaveBeenCalled();
	});
});
