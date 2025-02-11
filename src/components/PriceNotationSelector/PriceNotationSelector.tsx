import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { coinsActions } from 'store/slices/coinsSlice';
import { selectCoinsPriceNotation } from 'store/selectors/coinsSelectors';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import type { NotationType } from 'types/coin';

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

	const onChangeNotation = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedNotation = e.target.value as NotationType;
		dispatch(coinsActions.setPriceNotation(selectedNotation));
	};

	return (
		<select
			className={classnames(classes.PriceNotationSelector, className)}
			onChange={onChangeNotation}
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
