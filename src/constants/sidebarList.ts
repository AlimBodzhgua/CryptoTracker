import { RoutePath } from 'router/routeConfig';
import { SidebarItemType } from 'types/sidebar';
import CoinLogo from 'assets/icons/coin.svg';
import ProfileLogo from 'assets/icons/profile.svg';
import NewsLogo from 'assets/icons/star.svg';
import MainLogo from 'assets/icons/main.svg';
import ConverterLogo from 'assets/icons/swap.svg';

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
		text: 'Watchlist',
		path: RoutePath.watchlist,
		Icon: NewsLogo,
	},
	{
		text: 'Converter',
		path: RoutePath.converter,
		Icon: ConverterLogo,
	},
	{
		text: 'Profile',
		path: RoutePath.profile,
		Icon: ProfileLogo,
	},
];
