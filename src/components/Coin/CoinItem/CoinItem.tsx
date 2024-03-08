import React, { memo } from 'react';
import { ICoin } from 'types/coin';
import { useFormatter } from 'hooks/useFormatter';
import classnames from 'classnames';
import classes from './CoinItem.module.scss';

interface CoinItemProps {
	coin: ICoin;
	className?: string;
}

export const CoinItem: React.FC<CoinItemProps> = memo((props) => {
    const { coin, className } = props;
    const formatter = useFormatter();

    return (
        <tr className={classnames(classes.CoinItem, className)}>
            <th className={classes.rank}>{coin.rank}</th>
            <th className={classes.bigColumn}>
                <img
                    src={coin.iconUrl}
                    className={classes.icon}
                    alt={coin.symbol}
                />
                <div className={classes.name}>{coin.name}</div>
                <div className={classes.symbol}>{coin.symbol}</div>
            </th>
            <th>
                {formatter.format(Number(coin.price))}
            </th>
            <th className={coin.change.startsWith('-')
                ? classes.negative
                : classes.positive}
            >
                {coin.change}
                %
            </th>
            <th>
                {formatter.format(Number(coin['24hVolume']))}
            </th>
            <th>
                {formatter.format(Number(coin.marketCap))}
            </th>
        </tr>
    );
});
