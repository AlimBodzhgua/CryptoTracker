import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import classnames from 'classnames';

import { selectCoinsTag } from '../../model/coinsSelectors';
import { coinsActions } from '../../model/coinsSlice';
import { fetchCoins } from '../../model/coinsActions';
import { TagList } from '../../model/constants';
import { TagType } from '../../model/types';
import classes from './TagsSelector.module.scss';

interface TagsSelectorProps {
	className?: string;
}

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
