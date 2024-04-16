import { FC } from 'react';
import { Modal } from 'components/UI/Modal/Modal';
import { WatchListItemOverview } from '../WatchListItemOverview/WatchListItemOverview';
import { ICoin } from 'types/coin';

import classnames from 'classnames';

interface WatchListItemModalProps {
    coin: ICoin;
	isOpen: boolean;
	onClose: () => void;
	className?: string;
}

export const WatchListItemModal: FC<WatchListItemModalProps> = (props) => {
    const {
        coin,
        isOpen,
        onClose,
        className,
    } = props;

    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            className={classnames(className)}
        >
            <WatchListItemOverview coin={coin}/>
        </Modal>
    );
};
