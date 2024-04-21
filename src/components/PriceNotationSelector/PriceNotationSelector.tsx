import { FC } from 'react';
import { NotationType } from 'types/coin';
import { useAppDispatch } from 'hooks/redux';
import { coinsActions } from 'redux/slices/coinsSlice';

import classes from './PriceNotationSelector.module.scss';
import classnames from 'classnames';

interface PriceNotationSelectorProps {
	className?: string;
}

export const NotationList = {
	compact: 'compact',
	standard: 'standard',
	scientific:  'scientific',
	engineering: 'engineering',
} as const;

export const PriceNotationSelector: FC<PriceNotationSelectorProps> = ({className}) => {
	const dispatch = useAppDispatch();

	const onNotationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedNotation = e.target.value as NotationType;
		dispatch(coinsActions.setPriceNotation(selectedNotation));
	}

	return (
		<select
			className={classnames(classes.PriceNotationSelector, className)}
			onChange={onNotationSelect}
		>
			<option value={undefined} hidden>Price Notation</option>
			{Object.values(NotationList).map((notation) => (
	            <option
	            	key={notation}
	                value={notation}
	                className={classes.selectorOption}
	            >
	                {notation}
	            </option>
			))}
        </select>
	)
}