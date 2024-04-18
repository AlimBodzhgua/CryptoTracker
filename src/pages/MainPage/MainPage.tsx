import { FC, useEffect } from 'react';
import { Stats } from 'components/GlobalStats/Stats/Stats';
import { Page } from 'components/UI/Page/Page';
import { useAppDispatch } from 'hooks/redux';
import { fetchGlobalStats } from 'redux/actions/coinsActions';

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
            <Stats />
        </Page>
 	);
};

export default MainPage;
