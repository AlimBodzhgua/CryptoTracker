import React from 'react';
import { Decorator } from '@storybook/react';

export const DarkDecorator: Decorator = (Story) => (
	<div
		style={{
			backgroundColor: '#0A0B0F',
			padding: '40px 20px',
			minHeight: '100vh',
		}}
	>
		<Story />
	</div>
);
