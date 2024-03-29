import {
    FC, ChangeEvent, useCallback, useState, memo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonSize, ButtonTheme } from 'components/UI/Button/Button';
import { Input } from 'components/UI/Input/Input';
import { selectUser } from 'redux/selectors/userSelectors';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
    selecetConverterResult,
    selectConverterCoinFrom,
    selectConverterCoinTo,
    selectConverterIsLoading,
} from 'redux/selectors/converterSelectors';
import { converterActions } from 'redux/slices/converterSlice';
import { convertCoins } from 'redux/actions/converterActions';
import { Skeleton } from 'components/UI/Skeleton/Skeleton';

import HistoryIcon from 'assets/icons/history.svg';
import SwitchIcon from 'assets/icons/switch.svg';

import classnames from 'classnames';
import { CoinSelector } from './CoinSelector/CoinSelector';
import classes from './Converter.module.scss';

interface ConverterProps {
	className?: string;
}

export const Converter: FC<ConverterProps> = memo(({ className }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const coinFrom = useAppSelector(selectConverterCoinFrom);
    const coinTo = useAppSelector(selectConverterCoinTo);
    const result = useAppSelector(selecetConverterResult);
    const isLoading = useAppSelector(selectConverterIsLoading);

    const [amount, setAmount] = useState<number>(0);

    const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target?.value));
    };

    const onShowHistory = () => {
        if (!user) {
            alert(t('Only the user can see the history of previous conversions'));
        }
    };

    const onSwitch = useCallback(() => {
        dispatch(converterActions.switchCoins());
    }, [dispatch]);

    const onConvert = useCallback(() => {
        if (amount) {
            dispatch(convertCoins({ coinFrom, coinTo, amount }));
        }
    }, [dispatch, amount, coinFrom, coinTo]);

    return (
        <div className={classnames(classes.Converter, className)}>
            <div className={classes.header}>
                <h1 className={classes.title}>Converter</h1>
                <div className={classes.history}>
                    <HistoryIcon className={classes.historyIcon} />
                    <Button
                        className={classes.historyBtn}
                        theme={ButtonTheme.clear}
                        size={ButtonSize.big}
                        onClick={onShowHistory}
                    >
                        {t('History')}
                    </Button>
                </div>
            </div>

            <div className={classes.body}>
                <div className={classes.converterItem}>
                    <h4 className={classes.itemTitle}>From</h4>
                    <Input
                        className={classes.itemField}
                        fieldClassName={classes.inputField}
                        value={amount}
                        onChange={onAmountChange}
                        addonAfter={
                            <CoinSelector coin={coinFrom} listType='from' />
                        }
                        type='number'
                    />
                </div>

                <Button
                    className={classes.switchBtn}
                    theme={ButtonTheme.clear}
                    onClick={onSwitch}
                >
                    <SwitchIcon className={classes.switchIcon} />
                </Button>

                <div className={classes.converterItem}>
                    <h4 className={classes.itemTitle}>To</h4>
                    <Input
                        className={classes.itemField}
                        fieldClassName={classes.inputField}
                        type='number'
                        readOnly
                        addonAfter={
                            <CoinSelector coin={coinTo} listType='to' />
                        }
                        value={result}
                    />
                </div>
            </div>
            <div className={classes.rowInfo}>
                <span />
                {isLoading
                    ?	<Skeleton width='70%' radius='45px' height='33px' />
                    :	(
                        <div>
                            {`${amount} ${coinFrom.symbol} ≈ ${result} ${coinTo.symbol}`}
                        </div>
                    )}
                <span />
            </div>
            <Button
                className={classes.convertBtn}
                onClick={onConvert}
            >
                {t('Convert')}
            </Button>
        </div>
    );
});
