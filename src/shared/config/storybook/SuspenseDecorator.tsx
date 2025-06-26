import { Suspense } from 'react';
import { LoaderRing } from 'shared/UI/LoaderRing/LoaderRing';
import { Decorator } from '@storybook/react';

export const SuspenseDecorator: Decorator = (Story) => (
	<Suspense fallback={<LoaderRing />}>
		<Story />
	</Suspense>
);
