import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { useDebounce } from 'hooks/useDebounce';
import { selectCoins } from 'redux/selectors/coinsSelectors';
import { coinsActions } from 'redux/slices/coinsSlice';
import { Input } from 'components/UI/Input/Input';

import SearchIcon from 'assets/search.svg';
import classnames from 'classnames';
import classes from './CoinsSearchBar.module.scss';

interface CoinsSearchBarProps {
	className?: string;
}

export const CoinsSearchBar: React.FC<CoinsSearchBarProps> = (props) => {
    const { className } = props;
    const [searchQuery, setSearchQuery] = useState<string>('');
    const dispatch = useAppDispatch();
    const coins = useAppSelector(selectCoins);
    const debouncedValue = useDebounce<string>(searchQuery);

    useEffect(() => {
        const searchedCoins = coins?.filter((coin) => {
            if (coin.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return coin;
            }
        });
        dispatch(coinsActions.setCoins(searchedCoins));
        console.log(searchedCoins);
    }, [debouncedValue]);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Input
            type='text'
            placeholder='Search Coins...'
            value={searchQuery}
            onChange={onSearch}
            addonBefore={<SearchIcon />}
            className={classnames(classes.CoinsSearchBar, className)}
        />
    );
};
