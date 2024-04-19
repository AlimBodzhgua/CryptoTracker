import { FC, ReactNode, useCallback, useEffect } from 'react';
import { Portal } from '../Portal/Portal';

import classnames from 'classnames';
import classes from './Modal.module.scss';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children?: ReactNode;
	className?: string;
}

export const Modal: FC<ModalProps> = (props) => {
    const {
        isOpen,
        onClose,
        className,
        children,
    } = props;

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

    const onContentMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    const onBackgroundClick = () => {
    	closeHandler();
    };

    return (
        <Portal>
            <div
                className={classnames(classes.Modal, className, { [classes.opened]: isOpen })}
                onClick={onBackgroundClick}
                onMouseDown={onBackgroundClick}
                role='button'
                tabIndex={-1}
            >
                <div
                    className={classes.content}
                    onClick={onContentClick}
                    onMouseDown={onContentMouseDown}
                    role='button'
                    tabIndex={0}
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};
