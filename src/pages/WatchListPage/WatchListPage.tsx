import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchWatchListCoins } from 'redux/actions/coinsActions';
import { Page } from 'components/UI/Page/Page';
import { ICoin } from 'types/coin';
import { WatchList } from 'components/WatchList/WatchList';

import classnames from 'classnames';
import { selectUserWatchList } from 'redux/selectors/userSelectors';
import classes from './WatchListPage.module.scss';

interface WatchListPageProps {
	className?: string;
}

/* const API_KEY = process.env.NEWS_API;
const link = `https://newsdata.io/api/1/news?apikey=${API_KEY}` */

const WatchListPage: FC<WatchListPageProps> = ({ className }) => {
    const dispatch = useAppDispatch();
    const [watchListCoins, setWatchListCoins] = useState<ICoin[]>([]);
    const watchList = useAppSelector(selectUserWatchList);

    useEffect(() => {
        const fetchWatchList = async () => {
            const { meta, payload } = await dispatch(fetchWatchListCoins());

            if (meta.requestStatus === 'fulfilled') {
                setWatchListCoins(payload as ICoin[]);
            }
        };
        fetchWatchList();
    }, [watchList]);

    return (
        <Page className={classnames(classes.WatchListPage, className)}>
            <WatchList coins={watchListCoins} />
        </Page>
    );
};

export default WatchListPage;
