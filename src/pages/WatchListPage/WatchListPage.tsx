import type { FC } from 'react';
import { Page } from 'features/page';
import { WatchList } from 'features/user/ui/WatchList';

import classnames from 'classnames';
import classes from './WatchListPage.module.scss';

interface WatchListPageProps {
	className?: string;
}

const WatchListPage: FC<WatchListPageProps> = ({ className }) => {
	return (
		<Page className={classnames(classes.WatchListPage, className)}>
			<WatchList />
		</Page>
	);
};

export default WatchListPage;

