import { FC, useEffect, memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectConverterCoins } from 'store/selectors/converterSelectors';
import { fetchConverterCoins } from 'store/actions/converterActions';
import { Button } from 'components/UI/Button/Button';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import { CoinItem } from '../CoinItem/CoinItem';
import classes from './CoinsList.module.scss';

interface CoinsListProps {
	className?: string;
	onClose?: () => void;
}

export const CoinsList: FC<CoinsListProps> = memo((props) => {
	const {
		onClose,
		className,
	} = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const coins = useAppSelector(selectConverterCoins);
	const isShow = searchParams.has('listType');

	useEffect(() => {
		dispatch(fetchConverterCoins());
	}, [dispatch]);

	const onContentClick = (e: React.MouseEvent<HTMLUListElement>) => {
		e.stopPropagation();
	};

	return (
		<ul
			onClick={onContentClick}
			className={classnames(classes.CoinsList, className, { [classes.isShow]: isShow })}
		>
			<div className={classes.header}>
				<h2 className={classes.title}>{t('Select Coin')}</h2>
				<Button theme='clear' className={classes.close} onClick={onClose}>
					&times;
				</Button>
			</div>
			{coins.map((coin) => (
				<CoinItem coin={coin} key={coin.iconUrl} />
			))}
		</ul>
	);
});
