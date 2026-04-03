import type { FC, ReactElement } from 'react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import ErrorIcon from './assets/error_mark.svg';
import SuccessIcon from './assets/success.svg';
import WarningIcon from './assets/error.svg';
import classes from './Message.module.scss';

type MessageType = 'error' | 'warn' | 'success';

interface MessageProps {
	type: MessageType;
	text: string;
	withIcon?: boolean;
	className?: string;
}

const mapToMessageIcon: Record<MessageType, ReactElement> = {
	warn: <WarningIcon className={classes.icon} data-testid='icon'/>,
	error: <ErrorIcon className={classes.icon} data-testid='icon' />,
	success: <SuccessIcon className={classes.icon} data-testid='icon' />
};

export const Message: FC<MessageProps> = memo((props) => {
	const {
		type,
		text,
		withIcon,
		className,
	} = props;
	const { t } = useTranslation();

	const mapToMessageTitle = useMemo<Record<MessageType, string>>(() => ({
		error: t('status.error'),
		warn: t('status.warning'),
		success: t('status.success'),
	}), [t]);

	return (
		<div
			className={classnames(classes.Message, classes[type], className)}
			data-testid='message'
		>
			{withIcon && mapToMessageIcon[type]}
			<h1 className={classes.title}>{mapToMessageTitle[type]}</h1>
			<div className={classes.text}>{text}</div>
		</div>
	);
});
