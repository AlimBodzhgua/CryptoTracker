import { FC, memo } from 'react';
import { Coin } from 'shared/types/coin';
import { useTranslation } from 'react-i18next';
import { useFormatter } from 'shared/hooks/useFormatter';
import classnames from 'classnames';

import { Chart } from '../Chart/Chart';
import classes from './WatchListItemOverview.module.scss';

interface WatchListItemOverviewProps {
	coin: Coin;
	className?: string;
}

export const WatchListItemOverview: FC<WatchListItemOverviewProps> = memo((props) => {
	const { coin, className } = props;
	const { t } = useTranslation();
	const formatter = useFormatter({ currentCurrency: 'USD', notation: 'standard' });

	return (
		<div className={classnames(classes.WatchListItemOverview, className)}>
			<div className={classes.header}>
				<div className={classes.coinInfo}>
					<img src={coin.iconUrl} alt={coin.name} className={classes.icon} />
					<h1 className={classes.name}>{coin.name}</h1>
					<h1 className={classes.symbol}>{coin.symbol}</h1>
				</div>
				<div className={classes.rank}>
					{t('market.rank')} #{coin.rank}
				</div>
			</div>

			<div className={classes.stats}>
				<h2 className={classes.statsTitle}>{t('market.stats_title')}</h2>

				<div className={classes.statsSection}>
					<h4>Price</h4>
					<div className={classes.price}>{formatter.format(Number(coin.price))}</div>
				</div>

				<div className={classes.statsSection}>
					<h4>{t('coin_fields.market_cap')}</h4>
					<div>{formatter.format(Number(coin.marketCap))}</div>
				</div>

				<div className={classes.statsSection}>
					<h4>{t('coin_fields.change_24h')}</h4>
					<div
						className={
							coin.change.startsWith('-') ? classes.negative : classes.positive
						}
					>
						{coin.change}%
					</div>
				</div>
				<div className={classes.statsSection}>
					<h4>{t('coin_fields.volume_24h')}</h4>
					<div>{formatter.format(Number(coin['24hVolume']))}</div>
				</div>
			</div>
			<Chart sparkline={coin.sparkline!} />
		</div>
	);
});
