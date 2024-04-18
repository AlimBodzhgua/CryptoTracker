import {
    FC, useEffect, memo, useCallback,
} from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectConverterCoins } from 'redux/selectors/converterSelectors';
import { fetchConverterCoins } from 'redux/actions/converterActions';
import { Button, ButtonTheme } from 'components/UI/Button/Button';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { CoinItem } from '../CoinItem/CoinItem';

import classes from './CoinsList.module.scss';

interface CoinsListProps {
	className?: string;
	onHideCoinsList?: () => void;
}

export const CoinsList: FC<CoinsListProps> = memo((props) => {
    const {
        onHideCoinsList,
        className,
    } = props;
    const dispatch = useAppDispatch();
    const coins = useAppSelector(selectConverterCoins);
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const isShow = searchParams.has('listType');

    useEffect(() => {
        dispatch(fetchConverterCoins());
    }, [dispatch]);

    const onClose = useCallback(() => {
        if (onHideCoinsList) {
            onHideCoinsList();
        }
    }, [onHideCoinsList]);

    return (
        <ul className={classnames(
            classes.CoinsList,
            className,
            { [classes.isShow]: isShow },
        )}
        >
            <div className={classes.header}>
                <h2 className={classes.title}>{t('Select Coin')}</h2>
                <Button
                    theme={ButtonTheme.clear}
                    className={classes.close}
                    onClick={onClose}
                >
                    &times;
                </Button>
            </div>
            {coins.map((coin) => <CoinItem coin={coin} key={coin.iconUrl} />)}
        </ul>
    );
});
