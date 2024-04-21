import { FC, memo, useCallback } from 'react';
import { TagType } from 'types/coin';
import { useAppDispatch } from 'hooks/redux';
import { coinsActions } from 'redux/slices/coinsSlice';
import { fetchCoins } from 'redux/actions/coinsActions';

import classes from './TagsSelector.module.scss';
import classnames from 'classnames';

interface TagsSelectorProps {
	className?: string;
}

export const TagList = {
	'All Coins': 'All Coins',
	defi: 'defi',
	stablecoin: 'stablecoin',
	exchange: 'exchange',
	staking: 'staking',
	web3: 'web3',
	nft: 'nft',
	dex: 'dex',
	meme: 'meme',
	wrapped: 'wrapped',
} as const;

export const TagsSelector: FC<TagsSelectorProps> = memo(({className}) => {
	const dispatch = useAppDispatch();

	const onTagSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedTag = e.target.value as TagType;
		dispatch(coinsActions.setTag(selectedTag));
		dispatch(fetchCoins({page : 0}));
	}, [dispatch]);

	return (
		<select
			className={classnames(classes.TagsSelector, className)}
			onChange={onTagSelect}
		>
			{Object.keys(TagList).map((tag) => (
	            <option
	            	key={tag}
	                value={tag}
	                className={classes.selectorOption}
	            >
	                {tag}
	            </option>
			))}
        </select>
	)
})