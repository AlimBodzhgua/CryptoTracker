import { FC, memo } from 'react';
import classnames from 'classnames';
import type { GlobalStatsCoin } from '../../model/types';
import classes from './CoinsList.module.scss';

interface CoinsListProps {
	coins: Array<GlobalStatsCoin>;
	className?: string;
}
export const CoinsList: FC<CoinsListProps> = memo((props) => {
	const {
		coins,
		className,
	} = props;

	return (
		<ul className={classnames(classes.CoinsList, className)}>
			{coins.map((coin) => (
				<li className={classes.listItem} key={coin.iconUrl}>
					<img
						src={coin.iconUrl}
						alt={coin.name}
						className={classes.icon}
					/>
					<div className={classes.itemData}>
						<div className={classes.name}>{coin.name}</div>
						<div className={classes.symbol}>{coin.symbol}</div>
					</div>
				</li>
			))}
		</ul>
	);
});
