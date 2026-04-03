import type { FC } from 'react';
import { useState, useEffect, memo, useCallback, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'shared/hooks/redux';
import { useDebounce } from 'shared/hooks/useDebounce';
import { Input } from 'shared/UI/Input/Input';
import { Hotkey } from 'shared/UI/Hotkey/Hotkey';
import classnames from 'classnames';

import classes from './CoinsSearchBar.module.scss';
import { coinsActions, coinsSelectors } from '../../model/coinsSlice';
import SearchIcon from '../../assets/search.svg';

interface CoinsSearchBarProps {
	className?: string;
}

export const CoinsSearchBar: FC<CoinsSearchBarProps> = memo((props) => {
	const { className } = props;
	const { t } = useTranslation();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const dispatch = useAppDispatch();
	const coins = useAppSelector(coinsSelectors.selectCoins);
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

	return (
		<Input
			type='text'
			placeholder={t('placeholders.search_coins')}
			value={searchQuery}
			onChange={onSearch}
			ref={inputRef}
			addonBefore={<SearchIcon className={classes.icon} />}
			addonAfter={
				<div className={classes.hotkeys}>
					<Hotkey>alt</Hotkey>
					<span className={classes.hotkeyPlus}>+</span>
					<Hotkey>enter</Hotkey>
				</div>
			}
			className={classnames(classes.CoinsSearchBar, className)}
		/>
	);
});
