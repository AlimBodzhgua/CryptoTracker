import React, { useState, useEffect } from 'react';
import { CoinTable } from 'components/Coin/CoinTable/CoinTable';
import { Page } from 'components/UI/Page/Page';
import classnames from 'classnames';
import { useAppSelector } from 'hooks/redux';
import { selectCoins } from 'redux/selectors/coinsSelectors';
import classes from './CoinsPage.module.scss';

interface CoinsPageProps {
	className?: string;
}

const CoinsPage: React.FC<CoinsPageProps> = ({ className }) => {
    const [value, setValue] = useState<string>('');
    const coins = useAppSelector(selectCoins);

    useEffect(() => {
        const searchedCoins = coins?.filter((coin) => {
            if (coin.name.toLowerCase().includes(value.toLowerCase())) {
                return coin;
            }
        });
        console.log(searchedCoins);
    }, [value]);

    return (
        <Page className={classnames(classes.CoinsPage, className)}>
            <div>
                <input
                    type='text'
                    placeholder='Search Coins...'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <CoinTable />
        </Page>
    );
};

export default CoinsPage;
