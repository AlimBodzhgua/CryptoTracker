import { FC, useCallback, useEffect } from 'react';
import { CoinTable } from 'components/Coin/CoinTable/CoinTable';
import { Page } from 'components/UI/Page/Page';
import { CoinsSearchBar } from 'components/CoinsSearchBar/CoinsSearchBar';
import { useAppDispatch } from 'hooks/redux';
import { fetchCoins, fetchNextCoins } from 'redux/actions/coinsActions';
import { coinsActions } from 'redux/slices/coinsSlice';
import { TagsSelector } from 'components/TagsSelector/TagsSelector';
import { PriceNotationSelector } from 'components/PriceNotationSelector/PriceNotationSelector';
import { Button } from 'components/UI/Button/Button';

import ResetIcon from 'assets/icons/reset.svg';

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
        };
    }, [dispatch]);

    const loadNextCoins = useCallback(() => {
        dispatch(fetchNextCoins());
    }, [dispatch]);

    const resetSettings = useCallback(() => {
        dispatch(coinsActions.resetCoins());
    }, [dispatch]);

    return (
        <Page
            className={classnames(classes.CoinsPage, className)}
            onScrollEnd={loadNextCoins}
        >
            <div className={classes.header}>
                <CoinsSearchBar />
                <div className={classes.actions}>
                    <TagsSelector />
                    <PriceNotationSelector />
                    <Button
                        className={classes.resetBtn}
                        onClick={resetSettings}
                    >
                        <ResetIcon className={classes.resetIcon}/>
                    </Button>
                </div>
            </div>
            <CoinTable />
        </Page>
    );
};
export default CoinsPage;
