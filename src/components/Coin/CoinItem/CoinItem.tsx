import React from 'react';
import classnames from 'classnames';
import classes from './CoinItem.module.scss';

interface CoinItemProps {
	coin: string;
	className?: string;
}

export const CoinItem: React.FC<CoinItemProps> = (props) => {
    const { coin, className } = props;

    return (
        <div className={classnames(classes.CoinItem, className)}>
            CoinItem
        </div>
    );
};
