import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
	selectCoinsIsLoading,
	selectCoinsError,
	selectSearchedFilteredCoins,
	selectCoinsPageNumber,
} from 'store/selectors/coinsSelectors';
import { useAppSelector } from 'hooks/redux';
import { Message } from 'components/UI/Message/Message';
import classnames from 'classnames';

import { CoinTableRow } from '../CoinTableRow/CoinTableRow';
import { CoinTableHeader } from './CoinTableHeader';
import { CoinTableSkeleton } from './CoinTableSkeleton';
import classes from './CoinTable.module.scss';

interface CoinTableProps {
	className?: string;
}

export const CoinTable: FC<CoinTableProps> = memo(({ className }) => {
	const { t } = useTranslation();
	const searchedFilteredCoins = useAppSelector(selectSearchedFilteredCoins);
	const isLoading = useAppSelector(selectCoinsIsLoading);
	const page = useAppSelector(selectCoinsPageNumber);
	const error = useAppSelector(selectCoinsError);
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
