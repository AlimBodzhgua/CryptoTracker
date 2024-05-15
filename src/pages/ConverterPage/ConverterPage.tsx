import { FC, memo } from 'react';
import { Converter } from 'components/Converter';
import { Page } from 'components/UI/Page/Page';
import classnames from 'classnames';
import classes from './ConverterPage.module.scss';

interface ConverterPageProps {
	className?: string;
}

const ConverterPage: FC<ConverterPageProps> = memo(({ className }) => (
	<Page className={classnames(classes.ConverterPage, className)}>
		<Converter />
	</Page>
));

export default ConverterPage;
