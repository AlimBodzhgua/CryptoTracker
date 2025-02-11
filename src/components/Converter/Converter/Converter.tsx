import { FC, ChangeEvent, useState, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/UI/Button/Button';
import { Input } from 'components/UI/Input/Input';
import { selectUser } from 'store/selectors/userSelectors';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
	selecetConverterResult,
	selectConverterCoinFrom,
	selectConverterCoinTo,
	selectConverterIsLoading,
} from 'store/selectors/converterSelectors';
import { converterActions } from 'store/slices/converterSlice';
import { convertCoins } from 'store/actions/converterActions';
import { Skeleton } from 'components/UI/Skeleton/Skeleton';
import { HistoryModal } from 'components/History/HistoryModal/HistoryModal';
import { addHistory } from 'store/actions/userActions';
import HistoryIcon from 'assets/icons/history.svg';
import SwitchIcon from 'assets/icons/switch.svg';
import classnames from 'classnames';

import { CoinSelector } from '../CoinSelector/CoinSelector';
import classes from './Converter.module.scss';

interface ConverterProps {
	className?: string;
}

export const Converter: FC<ConverterProps> = memo(({ className }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const coinFrom = useAppSelector(selectConverterCoinFrom);
	const coinTo = useAppSelector(selectConverterCoinTo);
	const result = useAppSelector(selecetConverterResult);
	const isLoading = useAppSelector(selectConverterIsLoading);
	const formatter = Intl.NumberFormat('ru', { maximumSignificantDigits: 8 });

	const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
	const [amount, setAmount] = useState<number>(0);

	useEffect(() => () => {
		dispatch(converterActions.resetResult());
	}, []);

	const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAmount(Number(e.target?.value));
	};

	const onShowHistory = () => {
		if (!user) {
			alert(
				t('Only the user can see the history of previous conversions'),
			);
		} else {
			setShowHistoryModal(true);
		}
	};

	const onCloseHistoryModal = () => {
		setShowHistoryModal(false);
	};

	const onSwitch = () => {
		dispatch(converterActions.switchCoins());
	};

	const addNewHistory = (convertResult: number) => {
		dispatch(addHistory({
			coinFrom,
			coinTo,
			amount,
			convertResult,
		}));
	};

	const onConvert = async () => {
		if (amount) {
			const { meta, payload } = await dispatch(
				convertCoins({ coinFrom, coinTo, amount }),
			);
			if (meta.requestStatus === 'fulfilled' && user) {
				addNewHistory(payload as number);
			}
		}
	};

	return (
		<div className={classnames(classes.Converter, className)}>
			<div className={classes.header}>
				<h1 className={classes.title}>Converter</h1>
				<div className={classes.history}>
					<HistoryIcon className={classes.historyIcon} />
					<Button
						className={classes.historyBtn}
						theme='clear'
						size='big'
						onClick={onShowHistory}
					>
						{t('History')}
					</Button>
					<HistoryModal
						isOpen={showHistoryModal}
						onClose={onCloseHistoryModal}
					/>
				</div>
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
