import { useSortable } from '@dnd-kit/sortable';
import { ComponentProps, FC, ReactNode } from 'react';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps extends Omit<ComponentProps<'div'>, 'id'> {
	id: number | string;
	children: ReactNode;
}

export const SortableItem: FC<SortableItemProps> = (props) => {
	const {
		id,
		children,
		...otherProps
	} = props;
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id });

	const style = {
	    transform: CSS.Transform.toString(transform),
	    transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			{...otherProps}
		>
			{children}
		</div>
	);
};
