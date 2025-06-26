import {
	FC,
	MutableRefObject,
	ReactNode,
	useRef,
	UIEvent,
	useEffect,
	useCallback,
	useState,
} from 'react';
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll';
import { useThrottle } from 'shared/hooks/useThrottling';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { Button } from 'shared/UI/Button/Button';
import classnames from 'classnames';

import ArrowIcon from '../assets/left_arrow.svg';
import { scrollRestorationActions } from '../model/scrollRestorationSlice';
import { selectScrollByPath } from '../model/scrollRestorationSelectors';
import classes from './Page.module.scss';

interface PageProps {
	children: ReactNode;
	onScrollEnd?: () => void;
	withAutoScrollTopBtn?: boolean;
	className?: string;
}

export const Page: FC<PageProps> = (props) => {
	const { children, onScrollEnd, className, withAutoScrollTopBtn } = props;
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	const scrollPosition = useAppSelector((state) => selectScrollByPath(state, pathname));
	const [scrollAppearance, setScrollAppearance] = useState<{
		position: number;
		showBtn: boolean;
	}>({
		position: 0,
		showBtn: false,
	});

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
		const { height } = wrapperRef.current.getBoundingClientRect();
		setScrollAppearance({ position: height / 2, showBtn: false });
	}, []);

	const onScrollChange = useThrottle((e: UIEvent<HTMLDivElement>) => {
		const { scrollTop } = e.currentTarget;
		dispatch(
			scrollRestorationActions.setScroll({
				position: scrollTop,
				path: pathname,
			}),
		);

		if (scrollTop >= scrollAppearance.position && withAutoScrollTopBtn) {
			setScrollAppearance({ ...scrollAppearance, showBtn: true });
		} else if (
			scrollTop <= scrollAppearance.position
			&& withAutoScrollTopBtn
		) {
			setScrollAppearance({ ...scrollAppearance, showBtn: false });
		}
	}, 500);

	const onScrollClick = useCallback(() => {
		wrapperRef.current.scroll({ top: 0, behavior: 'smooth' });
	}, []);

	return (
		<main
			className={classnames(classes.Page, className)}
			ref={wrapperRef}
			onScroll={onScrollChange}
		>
			{children}
			{onScrollEnd ? (
				<div ref={triggerRef} style={{ marginTop: '-1px' }} />
			) : null}
			{scrollAppearance.showBtn && withAutoScrollTopBtn && (
				<Button
					theme='clear'
					className={classes.scrollBtn}
					onClick={onScrollClick}
				>
					<ArrowIcon className={classes.arrowIcon} />
				</Button>
			)}
		</main>
	);
};
