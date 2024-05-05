import { FC, MutableRefObject, ReactNode, useRef, UIEvent, useEffect } from 'react';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';
import { useThrottle } from 'hooks/useThrottling';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { scrollRestorationActions } from 'redux/slices/scrollRestorationSlice';
import { selectScrollByPath } from 'redux/selectors/scrollRestorationSelectors';
import classnames from 'classnames';
import classes from './Page.module.scss';

interface PageProps {
	children: ReactNode;
    onScrollEnd?: () => void;
	className?: string;
}

export const Page: FC<PageProps> = (props) => {
    const { children, onScrollEnd, className } = props;
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const scrollPosition = useAppSelector(
        (state) => selectScrollByPath(state, pathname)
    );

    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            wrapperRef.current.scrollTop = scrollPosition;
        }
    }, [])

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollRestorationActions.setScroll({
            position: e.currentTarget.scrollTop,
            path: pathname,
        }));
    }, 700)

    return (
        <div
            className={classnames(classes.Page, className)}
            ref={wrapperRef}
            onScroll={onScroll}
        >
            {children}
            {onScrollEnd 
                ? <div ref={triggerRef} style={{ marginTop: '-1px' }} />
                : null
            }
        </div>
    );
};
