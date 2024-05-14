import { fireEvent, screen, waitFor } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import LoginForm from './LoginForm';


describe('LoginForm', () => {
	test('Component should render', () => {
		componentRender(<LoginForm />);
		expect(screen.getByTestId('login-form')).toBeInTheDocument();
	});

	test('Component should have title', () => {
		componentRender(<LoginForm title={'Login form'}/>);
		expect(screen.getByText('Login form')).toBeInTheDocument();
	});

	test('Forget callback should be called', () => {
		const onForget = jest.fn();
		componentRender(<LoginForm title={'Login form'} onForget={onForget}/>);
		fireEvent.click(screen.getByText('Forgot Password?'))
		expect(onForget).toHaveBeenCalled();
	});

	test('Should move to register form', () => {
		componentRender(<LoginForm title={'Login form'}/>);
		const signUpBtn = screen.getByText('Sign Up'); 
		expect(signUpBtn).toBeInTheDocument();

		waitFor(() => fireEvent.click(signUpBtn))
			.then(() => expect(window.location.href).toHaveTextContent('?modal=register'))
	});

	test('Error messages on empty fields', () => {
		componentRender(<LoginForm title={'Login form'}/>);
		waitFor(() => fireEvent.click(screen.getByText('Login')))
			.then(() => {
				expect(screen.getByText('Please enter your email.')).toBeInTheDocument()
				expect(screen.getByText('Please enter your password.')).toBeInTheDocument()
			})
	});

	test('Success login', () => {
		const onSuccess = jest.fn();
		componentRender(<LoginForm title={'Login form'} onSuccess={onSuccess}/>);
		const email = screen.getByPlaceholderText('Enter email...')
		const password = screen.getByPlaceholderText('Enter password...')

		fireEvent.change(email, {target: {value: 'user@mail.ru'}})
		fireEvent.change(password, {target: {value: 'user123567'}})
		expect(email).toHaveValue('user@mail.ru');
		expect(password).toHaveValue('user123567');
		waitFor(() => fireEvent.click(screen.getByText('Login')))
			.then(() => expect(onSuccess).toHaveBeenCalled())
	});
})