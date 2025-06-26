import { FC } from 'react';
import { Modal } from 'shared/UI/Modal/Modal';
import { Coin } from 'shared/types/coin';
import classnames from 'classnames';
import { WatchListItemOverview } from '../WatchListItemOverview/WatchListItemOverview';

interface WatchListItemModalProps {
    coin: Coin;
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
			<WatchListItemOverview coin={coin} />
		</Modal>
	);
};
