import { render, screen } from "@testing-library/react";
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
})