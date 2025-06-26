import { FC, useState, useEffect, memo, useCallback, useRef, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from 'shared/hooks/redux';
import { useDebounce } from 'shared/hooks/useDebounce';
import { Input } from 'shared/UI/Input/Input';
import classnames from 'classnames';

import SearchIcon from '../../assets/search.svg';
import { selectCoins } from '../../model/coinsSelectors';
import { coinsActions } from '../../model/coinsSlice';
import classes from './CoinsSearchBar.module.scss';

interface CoinsSearchBarProps {
	className?: string;
}

export const CoinsSearchBar: FC<CoinsSearchBarProps> = memo((props) => {
	const { className } = props;
	const [searchQuery, setSearchQuery] = useState<string>('');
	const dispatch = useAppDispatch();
	const coins = useAppSelector(selectCoins);
	const debouncedValue = useDebounce<string>(searchQuery);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const searchResult = useMemo(
		() => coins.filter((coin) => coin.name.toLowerCase().includes(searchQuery.toLowerCase())),
		[debouncedValue, coins],
	);

	const onHotkeysPress = useCallback((e: KeyboardEvent) => {
		if (e.altKey === true && e.key === 'Enter') {
			if (document.activeElement === inputRef.current) {
				inputRef.current?.blur();
			} else {
				inputRef.current?.focus();
			}
		} else if (e.key === 'Escape' && document.activeElement === inputRef.current) {
			inputRef.current?.blur();
		}
	}, []);

	useEffect(() => {
		dispatch(coinsActions.setSearchedFilteredCoins(searchResult));
		window.addEventListener('keydown', onHotkeysPress);

		return () => window.removeEventListener('keydown', onHotkeysPress);
	}, [searchResult, onHotkeysPress, dispatch]);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const renderHotkeys = useCallback(
		() => (
			<div className={classes.hotkeyHelp}>
				<span className={classes.hotkeyItem}>alt</span>
				<span className={classes.hotkeyPlus}>+</span>
				<span className={classes.hotkeyItem}>enter</span>
			</div>
		),
		[],
	);

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
