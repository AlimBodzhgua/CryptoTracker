import { FC, memo, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { converterActions } from 'store/slices/converterSlice';
import { ConverterCoinType } from 'types/converter';
import { useSearchParams } from 'react-router-dom';
import { selectConverterCoinFrom, selectConverterCoinTo } from 'store/selectors/converterSelectors';
import CheckMarkIcon from 'assets/icons/check_mark.svg';
import classnames from 'classnames';
import classes from './CoinItem.module.scss';

interface CoinItemProps {
	className?: string;
	coin: ConverterCoinType;
}

type ConverterListType = 'from' | 'to';

export const CoinItem: FC<CoinItemProps> = memo((props) => {
	const { coin, className } = props;
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const coinFrom = useAppSelector(selectConverterCoinFrom);
	const coinTo = useAppSelector(selectConverterCoinTo);
	const listType = searchParams.get('listType') as ConverterListType;

	const markedCoin = useMemo<Record<ConverterListType, boolean>>(
		() => ({
			from: coinFrom.symbol === coin.symbol,
			to: coinTo.symbol === coin.symbol,
		}),
		[coinFrom, coinTo, coin],
	);

	const onSelectCoin = () => {
		if (listType === 'from') {
			dispatch(converterActions.setCoinFrom(coin));
		} else if (listType === 'to') {
			dispatch(converterActions.setCoinTo(coin));
		}
		setSearchParams('');
	};

	return (
		<li
			className={classnames(classes.CoinItem, className)}
			onClick={onSelectCoin}
			role='button'
			tabIndex={0}
		>
			<div className={classes.coinInfo}>
				<img src={coin.iconUrl} className={classes.icon} alt={coin.symbol} />
				<div className={classes.coinData}>
					<div className={classes.symbol}>{coin.symbol}</div>
					<div className={classes.name}>{coin.name}</div>
				</div>
			</div>
			{markedCoin[listType] && <CheckMarkIcon />}
		</li>
	);
});
