import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { Page } from 'features/page';
import { Button } from 'shared/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { userSelectors, addHistory, HistoryModal } from 'features/user';
import { Converter, ConversionResult } from 'features/coin-converter';
import classnames from 'classnames';
import classes from './ConverterPage.module.scss';
import HistoryIcon from './assets/history.svg';

interface ConverterPageProps {
	className?: string;
}

const ConverterPage: FC<ConverterPageProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => userSelectors.selectUser);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const { t } = useTranslation();

	const onCloseHistory = () => useCallback(() => setIsOpenModal(false), []);

	const onShowHistory = () => {
		if (!user) {
			alert(t('converter.only_user_can_see'));
		} else setIsOpenModal(true);
	};

	const addNewHistory = useCallback((data: ConversionResult) => {
		dispatch(addHistory({
			coinFrom: data.coinFrom,
			coinTo: data.coinTo,
			amount: data.amount,
			convertResult: data.result,
		}));
	}, [dispatch]);

	return (
		<Page className={classnames(classes.ConverterPage, className)}>
			<Converter
				onSuccessConvert={addNewHistory}
				headerRightContent={
					<div className={classes.history}>
						<HistoryIcon className={classes.historyIcon} />
						<Button
							className={classes.historyBtn}
							theme='clear'
							size='big'
							onClick={onShowHistory}
						>
							{t('buttons.history')}
						</Button>
						<HistoryModal
							isOpen={isOpenModal}
							onClose={onCloseHistory}
						/>
					</div>
				}
			/>
		</Page>
	);
};

export default ConverterPage;
