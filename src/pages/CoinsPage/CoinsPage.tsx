import React from 'react';
import { CoinTable } from 'components/Coin/CoinTable/CoinTable';
import { Page } from 'components/UI/Page/Page';
import { CoinsSearchBar } from 'components/CoinsSearchBar/CoinsSearchBar';
import { Button, ButtonTheme } from 'components/UI/Button/Button';
import { useAppSelector } from 'hooks/redux';
import { selectCoins } from 'redux/selectors/coinsSelectors';
import { Modal } from 'components/UI/Modal/Modal';
import classnames from 'classnames';
import { Portal } from 'components/UI/Portal/Portal';
import classes from './CoinsPage.module.scss';

interface CoinsPageProps {
	className?: string;
}

const CoinsPage: React.FC<CoinsPageProps> = ({ className }) => {
    const coins = useAppSelector(selectCoins);

    const onSortByName = () => {
        const sortedCoins = [...coins].sort((a, b) => a.name.localeCompare(b.name));
        console.log(sortedCoins);
    };

    const onSortByMarketCap = () => {
        const sortedCoins = [...coins].sort((a, b) => (a.marketCap > b.marketCap ? -1 : 1));
        console.log(sortedCoins);
    };

    const onSortByPrice = () => {
        const sortedCoins = [...coins].sort((a, b) => (Number(a.price) > Number(b.price) ? -1 : 1));
        console.log(sortedCoins);
    };

    const onSortByVolume = () => {
        const sortedCoins = [...coins].sort((a, b) => (a['24hVolume'] > b['24hVolume'] ? -1 : 1));
        console.log(sortedCoins);
    };

    return (
        <Page className={classnames(classes.CoinsPage, className)}>
            <div className={classes.actions}>
                <CoinsSearchBar />
                <div className={classes.filterBar}>
                    <h3>Sort by</h3>
                    <Button
                        theme={ButtonTheme.primary}
                        onClick={onSortByName}
                    >
                        Name
                    </Button>
                    <Button onClick={onSortByMarketCap}>Market cap</Button>
                    <Button onClick={onSortByPrice}>Price</Button>
                    <Button onClick={onSortByVolume}>Volume</Button>
                    <Button>Change</Button>
                </div>
            </div>
            <CoinTable />
        </Page>
    );
};

export default CoinsPage;
