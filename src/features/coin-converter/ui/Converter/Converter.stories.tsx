import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { initialConverterData } from '../../model/constants';
import { Converter } from './Converter';

const meta = {
	title: 'components/Converter',
	component: Converter,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Converter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const IsLoading: Story = {
	args: {},
	decorators: StoreDecorator({
		converter: {
			isLoading: true,
			converterData: initialConverterData,
		},
	}),
};
