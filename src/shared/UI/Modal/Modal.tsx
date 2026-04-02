import type { FC, ReactNode } from 'react';

import { useCallback, useEffect } from 'react';
import classnames from 'classnames';

import classes from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children?: ReactNode;
	className?: string;
}

export const Modal: FC<ModalProps> = (props) => {
	const { isOpen, onClose, className, children } = props;

	const closeHandler = useCallback(() => {
		if (onClose) {
			onClose();
		}
	}, [onClose]);

	const onKeydown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeHandler();
		}
	}, []);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeydown);
		}

		return () => window.removeEventListener('keydown', onKeydown);
	}, [isOpen]);

	const onContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const onBackgroundClick = () => {
		closeHandler();
	};

	return (
		<Portal>
			<div
				className={classnames(
					classes.overlay,
					{ [classes.opened]: isOpen },
				)}
				onClick={onBackgroundClick}
				role='button'
				tabIndex={-1}
				data-testid='modal'
			>
				<div
					className={classnames(classes.modal, className)}
					onClick={onContentClick}
					role='button'
					tabIndex={0}
				>
					{children}
				</div>
			</div>
		</Portal>
	);
};
