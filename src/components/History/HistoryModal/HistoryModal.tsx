import { FC, Suspense } from 'react';
import { Modal } from 'components/UI/Modal/Modal';
import { LoaderRing } from 'components/UI/LoaderRing/LoaderRing';
import classnames from 'classnames';
import { HistoryListAsync } from '../HistoryList/HistoryList.async';

import classes from './HistoryModal.module.scss';

interface HistoryModalProps {
	isOpen: boolean;
	onClose: () => void;
	className?: string;
}

export const HistoryModal: FC<HistoryModalProps> = (props) => {
    const {
        isOpen,
        onClose,
        className,
    } = props;

    return (
        <Modal
            className={classnames(classes.HistoryModal, className)}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Suspense fallback={<LoaderRing />}>
                <HistoryListAsync />
            </Suspense>
        </Modal>
    );
};
