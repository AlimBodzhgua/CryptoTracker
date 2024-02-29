import { RoutePath } from 'router/routeConfig';
import { t } from 'i18next';
import CoinLogo from 'assets/coin1.svg';
import ProfileLogo from 'assets/profile.svg';
import NewsLogo from 'assets/news.svg';
import MainLogo from 'assets/main.svg';
import { SidebarItemType } from './types';

export const sidebarList: SidebarItemType[] = [
    {
        text: t('Main'),
        path: RoutePath.main,
        Icon: MainLogo,
    },
    {
        text: t('Coins'),
        path: RoutePath.coins,
        Icon: CoinLogo,
    },
    {
        text: t('News'),
        path: RoutePath.news,
        Icon: NewsLogo,
    },
    {
        text: t('Profile'),
        path: RoutePath.profile,
        Icon: ProfileLogo,
    },
];
