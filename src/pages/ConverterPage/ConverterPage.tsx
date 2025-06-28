import { FC, memo, useState } from 'react';
import { Converter } from 'features/coin-converter';
import { Page } from 'features/page';
import { Button } from 'shared/UI/Button/Button';
import { HistoryModal } from 'features/user';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { selectUser } from 'features/user/model/userSelectors';
import { addHistory } from 'features/user/model/userActions';
import { ConversionResult } from 'features/coin-converter';
import classnames from 'classnames';
import classes from './ConverterPage.module.scss';
import HistoryIcon from './assets/history.svg';


interface ConverterPageProps {
	className?: string;
}

const ConverterPage: FC<ConverterPageProps> = memo(({ className }) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const { t } = useTranslation();

	const onCloseHistory = () => setIsOpenModal(false);

	const onShowHistory = () => {
		if (!user) {
			alert(t('Only the user can see the history of previous conversions'));
		} else setIsOpenModal(true);
	};

	const addNewHistory = (data: ConversionResult) => {
		dispatch(addHistory({
			coinFrom: data.coinFrom,
			coinTo: data.coinTo,
			amount: data.amount,
			convertResult: data.result,
		}));
	};

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
							{t('History')}
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
});

export default ConverterPage;
