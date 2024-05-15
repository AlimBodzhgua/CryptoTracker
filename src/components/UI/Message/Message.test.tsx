import { screen } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import { Message } from './Message';

describe('AppLink', () => {
	test('Component should render', () => {
		componentRender(<Message type="error" text="error message" />);
		expect(screen.getByTestId('message')).toBeInTheDocument();
	});

	test('Should have icon', () => {
		componentRender(<Message type="error" text="error message" withIcon />);
		expect(screen.getByTestId('message')).toBeInTheDocument();
		expect(screen.getByTestId('icon')).toBeInTheDocument();
	});

	test('Should be error type', () => {
		componentRender(<Message type="error" text="error message" />);
		expect(screen.getByTestId('message')).toHaveClass('error');
	});

	test('Should be warn type', () => {
		componentRender(<Message type="warn" text="warning message" />);
		expect(screen.getByTestId('message')).toHaveClass('warn');
	});

	test('Should be success type', () => {
		componentRender(<Message type="success" text="success message" />);
		expect(screen.getByTestId('message')).toHaveClass('success');
	});
});