import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { FC, useEffect } from 'react';
import { fetchCurrency } from 'store/actions/currencyActions';
import {
    selectCurrencyKurs,
    selectCurrentCurrency,
    selectTargetCurrency,
} from 'store/selectors/currencySelectors';
import { coinsActions } from 'store/slices/coinsSlice';
import { currencyActions } from 'store/slices/currencySlice';
import { AppRouter } from 'router/AppRouter';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { IUser } from 'types/user';
import { initUserAuth } from 'store/actions/userActions';
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
