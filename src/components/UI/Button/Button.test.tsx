import { render, screen } from '@testing-library/react';
import { Button, ButtonSize, ButtonTheme } from './Button';

describe('Button', () => {
	beforeEach(() => {
		render(
			<Button
				theme={ButtonTheme.primary}
				size={ButtonSize.medium}
				disabled
			>
				click
			</Button>,
		);
	});

	test('should render', () => {
		expect(screen.getByText('click')).toBeInTheDocument();
	});

	test('should have theme class', () => {
		expect(screen.getByText('click')).toHaveClass('primary');
	});

	test('should have size class', () => {
		expect(screen.getByText('click')).toHaveClass('medium');
	});

	test('should be disabled', () => {
		const btn = screen.getByText('click');
		expect(btn).toHaveClass('disabled');
		expect(btn).toBeDisabled();
	});
});
