import { fireEvent, screen, waitFor } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import RegisterForm from './RegisterForm';


describe('RegisterForm', () => {
	test('Component should render', () => {
		componentRender(<RegisterForm />);
		expect(screen.getByTestId('register-form')).toBeInTheDocument();
	});

	test('Component should have title', () => {
		componentRender(<RegisterForm title={'Register Form'}/>);
		expect(screen.getByText('Register Form')).toBeInTheDocument();
	});

	test('Should move to login form', () => {
		componentRender(<RegisterForm title={'Register Form'}/>);
		const signIn = screen.getByText('Sign In'); 
		expect(signIn).toBeInTheDocument();

		waitFor(() => fireEvent.click(signIn))
			.then(() => expect(window.location.href).toHaveTextContent('?modal=login'))
	});

	test('Error messages on empty fields', () => {
		componentRender(<RegisterForm title={'Register Form'}/>);
		waitFor(() => fireEvent.click(screen.getByText('Register')))
			.then(() => {
				expect(screen.getByText('Please enter your email.')).toBeInTheDocument()
				expect(screen.getByText('Please enter your password.')).toBeInTheDocument()
			})
	});

	test('Success register', () => {
		const onSuccess = jest.fn();
		componentRender(<RegisterForm title={'Register Form'} onSuccess={onSuccess}/>);
		const email = screen.getByPlaceholderText('Enter email...')
		const password = screen.getByPlaceholderText('Enter password...')

		fireEvent.change(email, {target: {value: 'user@mail.ru'}})
		fireEvent.change(password, {target: {value: 'user123567'}})
		expect(email).toHaveValue('user@mail.ru');
		expect(password).toHaveValue('user123567');
		waitFor(() => fireEvent.click(screen.getByText('Register')))
			.then(() => expect(onSuccess).toHaveBeenCalled())
	});
})