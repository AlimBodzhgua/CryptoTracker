import { RoutePath } from 'router/routeConfig';
import CoinLogo from 'assets/coin1.svg';
import ProfileLogo from 'assets/profile.svg';
import NewsLogo from 'assets/news.svg';
import MainLogo from 'assets/main.svg';
import { SidebarItemType } from './types';

export const sidebarList: SidebarItemType[] = [
    {
        text: 'Main',
        path: RoutePath.main,
        Icon: MainLogo,
    },
    {
        text: 'Coins',
        path: RoutePath.coins,
        Icon: CoinLogo,
    },
    {
        text: 'News',
        path: RoutePath.news,
        Icon: NewsLogo,
    },
    {
        text: 'Profile',
        path: RoutePath.profile,
        Icon: ProfileLogo,
    },
];
