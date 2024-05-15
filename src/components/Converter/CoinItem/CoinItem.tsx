import {
	FC, memo, useCallback, useMemo,
} from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { converterActions } from 'store/slices/converterSlice';
import { ConverterCoinType } from 'types/converter';
import { useSearchParams } from 'react-router-dom';
import { selectConverterCoinFrom, selectConverterCoinTo } from 'store/selectors/converterSelectors';

import classnames from 'classnames';
import classes from './CoinItem.module.scss';

interface CoinItemProps {
	className?: string;
	coin: ConverterCoinType;
}

export const CoinItem: FC<CoinItemProps> = memo(({ coin, className }) => {
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const coinFrom = useAppSelector(selectConverterCoinFrom);
	const coinTo = useAppSelector(selectConverterCoinTo);
	const listType = searchParams.get('listType');

	const markCondition = useCallback(() => {
		if (listType === 'from') {
			return coinFrom.symbol === coin.symbol;
		}
		if (listType === 'to') {
			return coinTo.symbol === coin.symbol;
		}
	}, [listType, coin]);

	const onSelectCoin = useCallback(() => {
		if (listType === 'from') {
			dispatch(converterActions.setCoinFrom(coin));
		} else if (listType === 'to') {
			dispatch(converterActions.setCoinTo(coin));
		}
		setSearchParams('');
	}, [dispatch, listType]);

	return (
		<li className={classnames(classes.coinItemWrapper, className)}>
			<div
				onClick={onSelectCoin}
				role='button'
				className={classes.coinItem}
				tabIndex={0}
			>
				<img
					src={coin.iconUrl}
					className={classes.icon}
					alt={coin.symbol}
				/>
				<div className={classes.coinData}>
					<div className={classes.symbol}>{coin.symbol}</div>
					<div className={classes.name}>{coin.name}</div>
					{markCondition() && (
						<span className={classes.checkMark}>&#10003;</span>
					)}
				</div>
			</div>
		</li>
	);
});
