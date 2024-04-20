import { FC, useState } from 'react';
import { TagType } from 'types/coin';
import { selectCoinsTag } from 'redux/selectors/coinsSelectors';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

import classes from './TagsSelector.module.scss';
import classnames from 'classnames';
import { coinsActions } from 'redux/slices/coinsSlice';

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
	wrapped: 'wrapped'
} as const

export const TagsSelector: FC<TagsSelectorProps> = ({className}) => {
	const dispatch = useAppDispatch();

	const onTagSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedTag = e.target.value as TagType;
		dispatch(coinsActions.setTag(selectedTag))
	}

	return (
		<select
			className={classnames(classes.TagsSelector, className)}
			onChange={onTagSelect}
		>
			{Object.values(TagList).map((tag) => (
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
}