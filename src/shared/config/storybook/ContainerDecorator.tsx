import React from 'react';
import { Decorator } from '@storybook/react';
import Container from 'shared/UI/Container/Container';

export const ContainerDecorator: Decorator = (Story) => (
	<Container>
		<Story />
	</Container>
);
