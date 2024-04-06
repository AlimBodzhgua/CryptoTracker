import { FC, useCallback } from 'react';
import { CoinTable } from 'components/Coin/CoinTable/CoinTable';
import { Page } from 'components/UI/Page/Page';
import { CoinsSearchBar } from 'components/CoinsSearchBar/CoinsSearchBar';
import { useAppDispatch } from 'hooks/redux';
import { fetchNextCoins } from 'redux/actions/coinsActions';

import classnames from 'classnames';
import classes from './CoinsPage.module.scss';

interface CoinsPageProps {
	className?: string;
}

const CoinsPage: FC<CoinsPageProps> = ({ className }) => {
    const dispatch = useAppDispatch();

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
