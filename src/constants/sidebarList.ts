import { SidebarItemType } from 'types/sidebar';
import CoinLogo from 'assets/icons/coin.svg';
import ProfileLogo from 'assets/icons/profile.svg';
import NewsLogo from 'assets/icons/star.svg';
import MainLogo from 'assets/icons/main.svg';
import ConverterLogo from 'assets/icons/swap.svg';
import {
	getRouteCoins,
	getRouteConverter,
	getRouteMain,
	getRouteProfile,
	getRouteWatchList,
} from 'router/router';

export const sidebarList: SidebarItemType[] = [
	{
		text: 'Main',
		path: getRouteMain(),
		Icon: MainLogo,
	},
	{
		text: 'Coins',
		path: getRouteCoins(),
		Icon: CoinLogo,
	},
	{
		text: 'Watchlist',
		path: getRouteWatchList(),
		Icon: NewsLogo,
	},
	{
		text: 'Converter',
		path: getRouteConverter(),
		Icon: ConverterLogo,
	},
	{
		text: 'Profile',
		path: getRouteProfile(),
		Icon: ProfileLogo,
	},
];
