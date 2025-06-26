import { fireEvent, screen, waitFor } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender';
import PasswordResetForm from './PasswordResetForm';

describe('PasswordResetForm', () => {
	beforeEach(() => {
		window.alert = jest.fn();
	});

	test('Component should render', () => {
		componentRender(<PasswordResetForm />);
		expect(screen.getByTestId('reset-form')).toBeInTheDocument();
	});

	test('Component should have title', () => {
		componentRender(<PasswordResetForm title='Reset Form' />);
		expect(screen.getByText('Reset Form')).toBeInTheDocument();
	});

	test('Should work cancel callback', () => {
		const onCancel = jest.fn();
		componentRender(<PasswordResetForm onCancel={onCancel} />);

		const cancelBtn = screen.getByText('Cancel');
		expect(cancelBtn).toBeInTheDocument();

		waitFor(() => fireEvent.click(cancelBtn)).then(() => expect(onCancel).toHaveBeenCalled());
	});

	test('Error messages on empty fields', () => {
		componentRender(<PasswordResetForm title='Reset Form' />);
		waitFor(() => fireEvent.click(screen.getByText('Reset'))).then(() => {
			expect(
				screen.getByText('Please enter your email.'),
			).toBeInTheDocument();
		});
	});

	test('Should work success', () => {
		const onSuccess = jest.fn();
		componentRender(<PasswordResetForm onSuccess={onSuccess} />);

		const email = screen.getByPlaceholderText('Enter you email...');
		fireEvent.change(email, { target: { value: 'user@mail.ru' } });

		expect(email).toHaveValue('user@mail.ru');
		waitFor(() => fireEvent.click(screen.getByText('Reset')))
			.then(() => expect(onSuccess).toHaveBeenCalled())
			.then(() => expect(screen.getByRole('paragraph')).toBeInTheDocument());
	});
});
