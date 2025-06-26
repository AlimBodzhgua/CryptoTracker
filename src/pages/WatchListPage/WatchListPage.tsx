import { FC } from 'react';
import { Page } from 'features/page';
import { WatchList } from 'features/user/ui/WatchList';

import classnames from 'classnames';
import classes from './WatchListPage.module.scss';

interface WatchListPageProps {
	className?: string;
}

const WatchListPage: FC<WatchListPageProps> = (props) => {
	const { className } = props;
	return (
		<Page className={classnames(classes.WatchListPage, className)}>
			<WatchList />
		</Page>
	);
};

export default WatchListPage;
