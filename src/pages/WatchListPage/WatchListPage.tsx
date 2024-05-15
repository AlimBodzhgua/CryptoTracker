import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchWatchListCoins } from 'store/actions/userActions';
import { Page } from 'components/UI/Page/Page';
import { WatchList } from 'components/WatchList';
import { selectUserMounted } from 'store/selectors/userSelectors';

import classnames from 'classnames';
import classes from './WatchListPage.module.scss';

interface WatchListPageProps {
	className?: string;
}

const WatchListPage: FC<WatchListPageProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const userMounted = useAppSelector(selectUserMounted);

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			if (userMounted) {
				dispatch(fetchWatchListCoins());
			}
		}
	}, [dispatch, userMounted]);

	return (
		<Page className={classnames(classes.WatchListPage, className)}>
			<WatchList />
		</Page>
	);
};

export default WatchListPage;
