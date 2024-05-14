import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Input } from './Input';


describe('Input', () => {
	test('should render', () => {
		render(<Input placeholder={'search'}/>)
		expect(screen.getByPlaceholderText('search')).toBeInTheDocument();
	});

	test('should have addon before', () => {
		render(<Input addonBefore={<div>before</div>} placeholder={'search'}/>);
		expect(screen.getByText(/before/i)).toBeInTheDocument();
	});

	test('should have addon after', () => {
		render(<Input placeholder={'search'} addonAfter={<div>after</div>}/>);
		expect(screen.getByText(/after/i)).toBeInTheDocument();
	});

	test('input field classname work', () => {
		render(<Input placeholder={'search'} fieldClassName={'searchInput'}/>);
		const input = screen.getByTestId('inputField');
		expect(input).toHaveClass('InputField searchInput');
	});

	test('input onChange work', () => {
		const onChange = jest.fn();
		render(<Input placeholder={'search'} fieldClassName={'searchInput'} onChange={onChange}/>);
		const input = screen.getByTestId('inputField');
		waitFor(() => fireEvent.change(input, {target: {value: 'react'}}))
			.then(() => expect(onChange).toHaveBeenCalledTimes(5))
	});

})