import type { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { Button } from 'shared/UI/Button/Button';
import { Message } from 'shared/UI/Message/Message';
import classnames from 'classnames';

import { HistoryItem } from '../HistoryItem/HistoryItem';
import { clearHistory } from '../../model/userActions';
import { userSelectors } from '../../model/userSlice';
import EmptyBox from '../../assets/empty-box.svg'

import { HistoryListSkeleton } from './HistoryListSkeleton';
import classes from './HistoryList.module.scss';

interface HistoryListProps {
	className?: string;
}

const HistoryList: FC<HistoryListProps> = ({ className }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const history = useAppSelector(userSelectors.selectUserConversionHistory);
	const isLoading = useAppSelector(userSelectors.selectUserIsLoading);
	const error = useAppSelector(userSelectors.selectUserError);

	const onClear = () => dispatch(clearHistory());

	if (error) {
		return <Message withIcon type='error' text={t('converter.error_loading_history')} />;
	}

	return (
		<>
			<div className={classes.header}>
				<h2 className={classes.title}>{t('converter.history_title')}</h2>
				<Button
					className={classes.clearBtn}
					size='sm'
					onClick={onClear}
					isLoading={isLoading}
				>
					{t('buttons.clear')}
				</Button>
			</div>
			<ul className={classnames(classes.HistoryList, className)}>
				{isLoading ? (
					<HistoryListSkeleton />
				) : history.length ? (
					history.map((item) => <HistoryItem item={item} key={item.convertResult} />)
				) : (
					<div className={classes.emptyMsg}>
						<EmptyBox className={classes.emptyIcon} />
						<h3 className={classes.emptyTitle}>{t('converter.history_empty')}</h3>
					</div>
				)}
			</ul>
		</>
	);
};

export default HistoryList;
