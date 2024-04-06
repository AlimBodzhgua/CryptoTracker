import React, { MutableRefObject, ReactNode, useRef } from 'react';
import classnames from 'classnames';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';
import classes from './Page.module.scss';

interface PageProps {
	children: ReactNode;
    onScrollEnd?: () => void;
	className?: string;
}

export const Page: React.FC<PageProps> = (props) => {
    const { children, onScrollEnd, className } = props;

    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    return (
        <div className={classnames(classes.Page, className)} ref={wrapperRef}>
            {children}
            <div ref={triggerRef} style={{ marginTop: '-1px' }} />
        </div>
    );
};
