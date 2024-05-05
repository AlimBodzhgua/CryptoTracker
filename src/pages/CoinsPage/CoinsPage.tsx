import { FC, useCallback, useEffect } from 'react';
import { CoinTable } from 'components/CoinTable';
import { Page } from 'components/UI/Page/Page';
import { CoinsSearchBar } from 'components/CoinsSearchBar/CoinsSearchBar';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchCoins, fetchNextCoins, resetCoinsSettings } from 'redux/actions/coinsActions';
import { TagsSelector } from 'components/TagsSelector/TagsSelector';
import { PriceNotationSelector } from 'components/PriceNotationSelector/PriceNotationSelector';
import { Button } from 'components/UI/Button/Button';
import { useSearchParams } from 'react-router-dom';
import { selectCoinsPageNumber } from 'redux/selectors/coinsSelectors';

import ResetIcon from 'assets/icons/reset.svg';

import classnames from 'classnames';
import classes from './CoinsPage.module.scss';

interface CoinsPageProps {
	className?: string;
}

const CoinsPage: FC<CoinsPageProps> = ({ className }) => {
    const dispatch = useAppDispatch();
    const page = useAppSelector(selectCoinsPageNumber);
    const [_, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            (page === 0) && dispatch(fetchCoins({ page }));
        }
    }, [dispatch]);

    const loadNextCoins = useCallback(() => {
        dispatch(fetchNextCoins());
    }, [dispatch]);

    const resetSettings = useCallback(() => {
        dispatch(resetCoinsSettings(setSearchParams));
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
                        <ResetIcon className={classes.resetIcon} />
                    </Button>
                </div>
            </div>
            <CoinTable />
        </Page>
    );
};
export default CoinsPage;
