import { FC, useEffect } from 'react';
import { GlobalStats } from 'components/GlobalStats';
import { Page } from 'components/UI/Page/Page';
import { useAppDispatch } from 'hooks/redux';
import { fetchGlobalStats } from 'store/actions/coinsActions';

import classnames from 'classnames';
import classes from './MainPage.module.scss';

interface MainPageProps {
	className?: string;
}

const MainPage: FC<MainPageProps> = ({ className }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchGlobalStats());
        }
    }, [dispatch]);

    return (
        <Page className={classnames(classes.MainPage, className)}>
            <GlobalStats />
        </Page>
 	);
};

export default MainPage;
