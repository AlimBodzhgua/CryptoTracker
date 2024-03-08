import { RoutePath } from 'router/routeConfig';
import { SidebarItemType } from 'types/sidebar';
import CoinLogo from 'assets/icons/coin.svg';
import ProfileLogo from 'assets/icons/profile.svg';
import NewsLogo from 'assets/icons/news.svg';
import MainLogo from 'assets/icons/main.svg';

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
