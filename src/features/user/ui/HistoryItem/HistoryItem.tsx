import { FC, memo } from 'react';
import classnames from 'classnames';

import type { HistoryType } from '../../model/types';
import classes from './HistoryItem.module.scss';

interface HistoryItemProps {
	item: HistoryType;
	className?: string;
}

export const HistoryItem: FC<HistoryItemProps> = memo(({ item, className }) => {
	const formatter = Intl.NumberFormat('ru', { maximumSignificantDigits: 8 });

	return (
		<li className={classnames(classes.HistoryItem, className)}>
			<div className={classes.coin}>
				<img
					src={item.coinFrom.iconUrl}
					alt={item.coinTo.symbol}
					className={classes.icon}
				/>
				<span>
					<div>{item.coinFrom.symbol}</div>
					<div>{item.coinFrom.name}</div>
				</span>
			</div>

			<div className={classes.numbers}>
				<div>{item.amount}</div>≈
				<div>{formatter.format(item.convertResult)}</div>
			</div>

			<div className={classes.coin}>
				<span>
					<div>{item.coinTo.symbol}</div>
					<div>{item.coinTo.name}</div>
				</span>
				<img
					src={item.coinTo.iconUrl}
					alt={item.coinTo.symbol}
					className={classes.icon}
				/>
			</div>
		</li>
	);
});
