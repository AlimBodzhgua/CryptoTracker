import { FC } from 'react';
import { CoinTable, useCoins } from 'features/coins-table';
import { Page } from 'features/page';
import { CoinsSearchBar } from 'features/coins-table';
import { TagsSelector } from 'features/coins-table';
import { PriceNotationSelector } from 'features/coins-table';
import { Button } from 'shared/UI/Button/Button';
import ResetIcon from './assets/reset.svg';

import classnames from 'classnames';
import classes from './CoinsPage.module.scss';

interface CoinsPageProps {
	className?: string;
}

const CoinsPage: FC<CoinsPageProps> = ({ className }) => {
	const { loadNextCoins, resetSettings } = useCoins();

	return (
		<Page
			className={classnames(classes.CoinsPage, className)}
			onScrollEnd={loadNextCoins}
			withAutoScrollTopBtn
		>
			<div className={classes.header}>
				<CoinsSearchBar />
				<div className={classes.actions}>
					<TagsSelector />
					<PriceNotationSelector />
					<Button
						className={classes.resetBtn}
						onClick={resetSettings}
					>
						<ResetIcon className={classes.resetIcon} />
					</Button>
				</div>
			</div>
			<CoinTable />
		</Page>
	);
};

export default CoinsPage;
