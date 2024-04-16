import { FC, useCallback, useEffect } from 'react';
import { CoinTable } from 'components/Coin/CoinTable/CoinTable';
import { Page } from 'components/UI/Page/Page';
import { CoinsSearchBar } from 'components/CoinsSearchBar/CoinsSearchBar';
import { useAppDispatch } from 'hooks/redux';
import { fetchCoins, fetchNextCoins } from 'redux/actions/coinsActions';
import { coinsActions } from 'redux/slices/coinsSlice';

import classnames from 'classnames';
import classes from './CoinsPage.module.scss';

interface CoinsPageProps {
	className?: string;
}

const CoinsPage: FC<CoinsPageProps> = ({ className }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchCoins({ page: 0 }));
        }

        return () => {
            dispatch(coinsActions.resetCoins());
        }
    }, [dispatch]);

    const loadNextCoins = useCallback(() => {
        dispatch(fetchNextCoins());
    }, [dispatch]);

    return (
        <Page
            className={classnames(classes.CoinsPage, className)}
            onScrollEnd={loadNextCoins}
        >
            <div className={classes.actions}>
                <CoinsSearchBar />
            </div>
            <CoinTable />
        </Page>
    );
};
export default CoinsPage;
