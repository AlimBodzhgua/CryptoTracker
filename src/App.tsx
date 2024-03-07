import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { FC, useEffect } from 'react';
import { fetchCurrency } from 'redux/actions/currencyActions';
import { selectTargetCurrency, selectTargetCurrencyPrice } from 'redux/selectors/currencySelectors';
import { coinsActions } from 'redux/slices/coinsSlice';
import { AppRouter } from 'router/AppRouter';
import 'styles/index.scss';

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const targetCurrency = useAppSelector(selectTargetCurrency);
    const targetCurrencyPrice = useAppSelector(selectTargetCurrencyPrice);

    useEffect(() => {
        dispatch(fetchCurrency());
    }, [dispatch]);

    useEffect(() => {
        if (targetCurrencyPrice) {
            dispatch(coinsActions.changeCurrency(targetCurrencyPrice));
        }
        console.log(targetCurrencyPrice);
    }, [targetCurrency]);

    return (
        <AppRouter />
    );
};
