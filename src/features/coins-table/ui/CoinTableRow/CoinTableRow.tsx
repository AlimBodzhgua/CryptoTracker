import { FC, memo, ReactNode } from 'react';
import { useFormatter } from 'shared/hooks/useFormatter';
import { useAppSelector } from 'shared/hooks/redux';
import classnames from 'classnames';
import type { Coin } from 'shared/types/coin';

import { coinsSelectors } from '../../model/coinsSlice';
import classes from './CoinTableRow.module.scss';


interface CoinTableRowProps {
	coin: Coin;
	className?: string;
	renderActionColumn?: (coinId: string) => ReactNode;
}

export const CoinTableRow: FC<CoinTableRowProps> = memo((props) => {
	const { coin, renderActionColumn, className } = props;
	const priceNotation = useAppSelector(coinsSelectors.selectCoinsPriceNotation);
	const formatter = useFormatter({ currentCurrency: 'USD', notation: priceNotation });

	return (
		<tr className={classnames(classes.CoinTableRow, className)}>
			<td className={classes.rank}>{coin.rank}</td>
			<td className={classes.bigColumn}>
				<img src={coin.iconUrl} className={classes.icon} alt={coin.symbol} />
				<div className={classes.name}>{coin.name}</div>
				<div className={classes.symbol}>{coin.symbol}</div>
			</td>
			<td>{formatter.format(Number(coin.price))}</td>
			<td className={coin.change?.startsWith('-') ? classes.negative : classes.positive}>
				{coin.change ? `${coin.change}%` : '-'}
			</td>
			<td>{formatter.format(Number(coin['24hVolume']))}</td>
			<td>{formatter.format(Number(coin.marketCap))}</td>
			<td>
				{renderActionColumn && renderActionColumn(coin.uuid)}
			</td>
		</tr>
	);
});
