import { FC, memo, useCallback } from 'react';
import { NotationType } from 'types/coin';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { coinsActions } from 'store/slices/coinsSlice';
import { selectCoinsPriceNotation } from 'store/selectors/coinsSelectors';
import { useTranslation } from 'react-i18next';

import classnames from 'classnames';
import classes from './PriceNotationSelector.module.scss';

interface PriceNotationSelectorProps {
	className?: string;
}

export const NotationList = {
	compact: 'compact',
	standard: 'standard',
	scientific: 'scientific',
	engineering: 'engineering',
} as const;

export const PriceNotationSelector: FC<PriceNotationSelectorProps> = memo(({ className }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const priceNotation = useAppSelector(selectCoinsPriceNotation);

	const onNotationSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedNotation = e.target.value as NotationType;
		dispatch(coinsActions.setPriceNotation(selectedNotation));
	}, [dispatch]);

	return (
		<select
			className={classnames(classes.PriceNotationSelector, className)}
			onChange={onNotationSelect}
			value={priceNotation === undefined ? 'placeholder' : priceNotation}
			data-testid='price-selector'
		>
			<option
				value='placeholder'
				hidden
			>
				{t('Price Notation')}
			</option>
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
	);
});
