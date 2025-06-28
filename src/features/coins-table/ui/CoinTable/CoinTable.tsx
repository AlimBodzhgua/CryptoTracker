import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'shared/hooks/redux';
import { Message } from 'shared/UI/Message/Message';
import classnames from 'classnames';

import { coinsSelectors } from '../../model/coinsSlice';
import { CoinTableRow } from '../CoinTableRow/CoinTableRow';
import { CoinTableHeader } from './CoinTableHeader';
import { CoinTableSkeleton } from './CoinTableSkeleton';
import classes from './CoinTable.module.scss';

interface CoinTableProps {
	className?: string;
}

export const CoinTable: FC<CoinTableProps> = memo(({ className }) => {
	const { t } = useTranslation();
	const searchedFilteredCoins = useAppSelector(coinsSelectors.selectSearchedFilteredCoins);
	const isLoading = useAppSelector(coinsSelectors.selectCoinsIsLoading);
	const page = useAppSelector(coinsSelectors.selectCoinsPageNumber);
	const error = useAppSelector(coinsSelectors.selectCoinsError);
	const withHeader = page === 0;

	if (error) {
		return (
			<Message
				type='error'
				text={t(
					'Error fetching data, try to reload the page, or visiti the page later',
				)}
				withIcon
				className={classes.errorMsg}
			/>
		);
	}

	return (
		<>
			<table className={classnames(classes.table, className)}>
				{searchedFilteredCoins.length ? (
					<>
						<CoinTableHeader />
						<tbody>
							{searchedFilteredCoins.map((coin) => (
								<CoinTableRow coin={coin} key={coin.uuid} />
							))}
						</tbody>
					</>
				) : null}
			</table>
			{isLoading && (
				<CoinTableSkeleton
					withHeader={withHeader}
					className={classes.tableSkeleton}
				/>
			)}
		</>
	);
});
