import { FC, memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import classnames from 'classnames';
import ArrowIcon from 'assets/icons/arrow.svg';

import { ConverterCoinType, ConverterListType } from '../../model/types';
import { CoinsList } from '../CoinsList/CoinsList';
import classes from './CoinSelector.module.scss';

interface CoinSelectorProps {
	coin: ConverterCoinType;
	listType: ConverterListType;
	className?: string;
}

export const CoinSelector: FC<CoinSelectorProps> = memo((props) => {
	const {
		coin,
		listType,
		className,
	} = props;
	const [_, setSearchParams] = useSearchParams();

	const onShowList = useCallback(() => {
		setSearchParams({ listType });
	}, []);

	const onHideList = useCallback(() => {
		setSearchParams('');
	}, []);

	return (
		<div
			role='button'
			className={classnames(classes.coinsSelector, className)}
			onClick={onShowList}
			tabIndex={0}
		>
			<img
				src={coin.iconUrl}
				alt={coin.symbol}
				className={classes.fromIcon}
			/>
			<div className={classes.fromSymbol}>{coin.symbol}</div>
			<ArrowIcon className={classes.arrow} />
			<CoinsList onClose={onHideList} />
		</div>
	);
});
