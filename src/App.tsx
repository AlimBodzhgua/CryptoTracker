import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { FC, useEffect } from 'react';
import { fetchCurrency } from 'redux/actions/currencyActions';
import {
    selectCurrencyKurs,
    selectCurrentCurrency,
    selectTargetCurrency,
} from 'redux/selectors/currencySelectors';
import { coinsActions } from 'redux/slices/coinsSlice';
import { currencyActions } from 'redux/slices/currencySlice';
import { AppRouter } from 'router/AppRouter';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { IUser } from 'types/user';
import { initUserAuth } from 'redux/actions/userActions';
import 'styles/index.scss';

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const targetCurrency = useAppSelector(selectTargetCurrency);
    const currentCurrency = useAppSelector(selectCurrentCurrency);
    const kurs = useAppSelector(selectCurrencyKurs);

    useEffect(() => {
        dispatch(fetchCurrency());
        const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (user) {
            const authData = JSON.parse(user) as IUser;
            dispatch(initUserAuth(authData.id));
        }
    }, [dispatch]);

    useEffect(() => {
        if (kurs && targetCurrency) {
            dispatch(coinsActions.changeCoinsCurrency({
                kurs,
                currentCurrency,
                targetCurrency,
            }));
            dispatch(currencyActions.resetCurrentCurrency());
        }
    }, [dispatch, targetCurrency]);

    return (
        <AppRouter />
    );
};
