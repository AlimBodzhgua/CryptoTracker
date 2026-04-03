import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'shared/UI/Button/Button';
import { DarkDecorator } from 'shared/config/storybook/DarkDecorator';
import { Header } from './Header';

const meta = {
	title: 'components/Header',
	component: Header,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: DarkDecorator,
	argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		elements: (
			<>
				<Button size='small'>Login</Button>
				<Button size='small'>Register</Button>
			</>
		),
	},
};
