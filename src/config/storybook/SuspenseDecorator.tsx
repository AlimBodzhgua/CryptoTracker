import { Suspense } from 'react';
import { LoaderRing } from 'components/UI/LoaderRing/LoaderRing';
import { Decorator } from '@storybook/react';

export const SuspenseDecorator: Decorator = (Story) => (
    <Suspense fallback={<LoaderRing />}>
        <Story />
    </Suspense>
);
