import { FC, memo } from 'react';
import { TagType } from 'types/coin';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { coinsActions } from 'store/slices/coinsSlice';
import { fetchCoins } from 'store/actions/coinsActions';
import { selectCoinsTag } from 'store/selectors/coinsSelectors';

import classnames from 'classnames';
import classes from './TagsSelector.module.scss';

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

export const TagsSelector: FC<TagsSelectorProps> = memo(({ className }) => {
	const dispatch = useAppDispatch();
	const tag = useAppSelector(selectCoinsTag);

	const onChangeTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedTag = e.target.value as TagType;
		dispatch(coinsActions.setTag(selectedTag));
		dispatch(fetchCoins(0));
	};

	return (
		<select
			className={classnames(classes.TagsSelector, className)}
			onChange={onChangeTag}
			value={tag}
			data-testid='tags-selector'
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
	);
});
