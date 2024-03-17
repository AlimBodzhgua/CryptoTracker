import React, {
    useState, useEffect, memo, useCallback, useRef,
} from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { useDebounce } from 'hooks/useDebounce';
import { selectCoins } from 'redux/selectors/coinsSelectors';
import { coinsActions } from 'redux/slices/coinsSlice';
import { Input } from 'components/UI/Input/Input';

import SearchIcon from 'assets/icons/search.svg';
import classnames from 'classnames';
import classes from './CoinsSearchBar.module.scss';

interface CoinsSearchBarProps {
	className?: string;
}

export const CoinsSearchBar: React.FC<CoinsSearchBarProps> = memo((props) => {
    const { className } = props;
    const [searchQuery, setSearchQuery] = useState<string>('');
    const dispatch = useAppDispatch();
    const coins = useAppSelector(selectCoins);
    const debouncedValue = useDebounce<string>(searchQuery);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const searchedCoins = coins?.filter((coin) => {
            if (coin.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return coin;
            }
        });
        dispatch(coinsActions.setSearchedFilteredCoins(searchedCoins));
    }, [debouncedValue, coins]);

    const onHotkeysPress = useCallback((e: KeyboardEvent) => {
        if (e.altKey === true && e.key === 'Enter') {
            if (document.activeElement === inputRef.current) {
                inputRef.current?.blur();
            } else {
                inputRef.current?.focus();
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', onHotkeysPress);

        return () => window.removeEventListener('keydown', onHotkeysPress);
    }, []);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const renderHotkeys = useCallback(() => (
        <div className={classes.hotkeyHelp}>
            <span className={classes.hotkeyItem}>alt</span>
            <span className={classes.hotkeyPlus}>+</span>
            <span className={classes.hotkeyItem}>enter</span>
        </div>
    ), []);

    return (
        <Input
            type='text'
            placeholder='Search Coins...'
            value={searchQuery}
            onChange={onSearch}
            ref={inputRef}
            addonBefore={<SearchIcon className={classes.icon} />}
            addonAfter={renderHotkeys()}
            className={classnames(classes.CoinsSearchBar, className)}
        />
    );
});
