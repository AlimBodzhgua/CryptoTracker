import React from 'react';
import classnames from 'classnames';
import { CoinItem } from '../CoinItem/CoinItem';
import classes from './CoinList.module.scss';

export enum CoinView {
	'LIST',
	'PLATE'
}

interface CoinListProps {
	view?: CoinView
	className?: string;
}

export const CoinList: React.FC<CoinListProps> = ({ view, className }) => (
    <div className={classnames(classes.CoinList, className)}>
        CoinList
    </div>
);
