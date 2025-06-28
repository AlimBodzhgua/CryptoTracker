import { FC, ChangeEvent, useState, memo, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/UI/Button/Button';
import { Input } from 'shared/UI/Input/Input';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import classnames from 'classnames';

import { convertCoins } from '../../model/actions';
import {
	selecetConverterResult,
	selectConverterCoinFrom,
	selectConverterCoinTo,
	selectConverterIsLoading,
} from '../../model/selectors';
import { converterActions } from '../../model/converterSlice';
import type { ConversionResult } from '../../model/types';
import SwitchIcon from '../../assets/switch.svg';

import { CoinSelector } from '../CoinSelector/CoinSelector';
import classes from './Converter.module.scss';

interface ConverterProps {
	className?: string;
	headerRightContent?: ReactNode;
	onSuccessConvert?: (data: ConversionResult) => void;
}

export const Converter: FC<ConverterProps> = memo((props) => {
	const {
		headerRightContent,
		onSuccessConvert,
		className,
	} = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const coinFrom = useAppSelector(selectConverterCoinFrom);
	const coinTo = useAppSelector(selectConverterCoinTo);
	const result = useAppSelector(selecetConverterResult);
	const isLoading = useAppSelector(selectConverterIsLoading);
	const formatter = Intl.NumberFormat('ru', { maximumSignificantDigits: 8 });

	const [amount, setAmount] = useState<number>(0);

	useEffect(() => () => {
		dispatch(converterActions.resetResult());
	}, []);

	const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAmount(Number(e.target?.value));
	};

	const onSwitch = () => {
		dispatch(converterActions.switchCoins());
	};

	const onConvert = async () => {
		if (amount) {
			const { meta, payload } = await dispatch(
				convertCoins({ coinFrom, coinTo, amount }),
			);
			if (meta.requestStatus === 'fulfilled' && onSuccessConvert) {
				onSuccessConvert({ coinFrom, coinTo, amount, result: payload as number });
			}
		}
	};

	return (
		<div className={classnames(classes.Converter, className)}>
			<div className={classes.header}>
				<h1 className={classes.title}>Converter</h1>
				{headerRightContent}
			</div>

			<div className={classes.body}>
				<div className={classes.converterItem}>
					<h4 className={classes.itemTitle}>From</h4>
					<Input
						className={classes.itemField}
						fieldClassName={classes.inputField}
						value={amount}
						onChange={onAmountChange}
						addonAfter={
							<CoinSelector coin={coinFrom} listType='from' />
						}
						type='number'
					/>
				</div>

				<Button
					className={classes.switchBtn}
					theme='clear'
					onClick={onSwitch}
				>
					<SwitchIcon className={classes.switchIcon} />
				</Button>

				<div className={classes.converterItem}>
					<h4 className={classes.itemTitle}>To</h4>
					<Input
						className={classes.itemField}
						fieldClassName={classes.inputField}
						readOnly
						addonAfter={
							<CoinSelector coin={coinTo} listType='to' />
						}
						value={result}
					/>
				</div>
			</div>
			<div className={classes.rowInfo}>
				<span />
				{isLoading ? (
					<Skeleton width='70%' radius='45px' height='33px' />
				) : (
					<div>
						{`${amount} ${coinFrom.symbol} ≈ ${formatter.format(result)} ${coinTo.symbol}`}
					</div>
				)}
				<span />
			</div>
			<Button
				className={classes.convertBtn}
				onClick={onConvert}
				disabled={isLoading}
			>
				{t('Convert')}
			</Button>
		</div>
	);
});
