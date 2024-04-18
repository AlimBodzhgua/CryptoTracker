import { FC, memo, useCallback } from 'react';
import { ConverterCoinType, ConverterListType } from 'types/converter';
import { useSearchParams } from 'react-router-dom';

import ArrowIcon from 'assets/icons/arrow.svg';

import classnames from 'classnames';
import { CoinsList } from '../CoinsList/CoinsList';
import classes from './CoinSelector.module.scss';

interface CoinSelectorProps {
	coin: ConverterCoinType;
	listType: ConverterListType;
	className?: string;
}

export const CoinSelector: FC<CoinSelectorProps> = memo((props) => {
    const { coin, listType, className } = props;
    const [_, setSearchParams] = useSearchParams();

    const onShowCoinList = useCallback(() => {
        setSearchParams({ listType });
    }, []);

    const onHideCoinsList = useCallback(() => {
        setSearchParams('');
    }, []);

    return (
        <>
            <div
                role='button'
                className={classnames(classes.coinsSelector, className)}
                onClick={onShowCoinList}
                tabIndex={0}
            >
                <img
                    src={coin.iconUrl}
                    alt={coin.symbol}
                    className={classes.fromIcon}
                />
                <div className={classes.fromSymbol}>{coin.symbol}</div>
                <ArrowIcon className={classes.arrow} />
            </div>
            <CoinsList
                onHideCoinsList={onHideCoinsList}
            />
        </>
    );
});
