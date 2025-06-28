import { FC } from 'react';
import { Page } from 'features/page';
import { useAppSelector } from 'shared/hooks/redux';
import { GlobalStats } from 'features/global-stats';
import classnames from 'classnames';
import { currencySelectors } from 'features/currency';
import classes from './MainPage.module.scss';

interface MainPageProps {
	className?: string;
}

const MainPage: FC<MainPageProps> = ({ className }) => {
	const currenctCurrency = useAppSelector(currencySelectors.selectCurrentCurrency);

	return (
		<Page className={classnames(classes.MainPage, className)}>
			<GlobalStats currentCurrency={currenctCurrency}/>
		</Page>
 	);
};

export default MainPage;
