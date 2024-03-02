import React from 'react';
import classnames from 'classnames';
import { ICoin } from 'types/types';
import classes from './CoinItem.module.scss';

interface CoinItemProps {
	coin: ICoin;
	className?: string;
}

export const CoinItem: React.FC<CoinItemProps> = (props) => {
    const { coin, className } = props;

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
                $
                {coin.price}
            </th>
            <th className={coin.change.startsWith('-')
                ? classes.negative
                : classes.positive}
            >
                {coin.change}
                %
            </th>
            <th>
                $
                {coin['24hVolume']}
            </th>
            <th>
                $
                {coin.marketCap}
            </th>
        </tr>
    );
};
