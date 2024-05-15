import { FC, memo } from 'react';
import { GlobalStatsCoin } from 'types/coin';
import classnames from 'classnames';
import classes from './List.module.scss';

interface ListProps {
	coins: Array<GlobalStatsCoin>;
	className?: string;
}
export const List: FC<ListProps> = memo((props) => {
	const {
		coins,
		className,
	} = props;

	return (
		<ul className={classnames(classes.List, className)}>
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