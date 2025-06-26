import CoinLogo from '../assets/coin.svg';
import ProfileLogo from '../assets/profile.svg';
import NewsLogo from '../assets/star.svg';
import MainLogo from '../assets/main.svg';
import ConverterLogo from '../assets/swap.svg';
import {
	getRouteCoins,
	getRouteConverter,
	getRouteMain,
	getRouteProfile,
	getRouteWatchList,
} from 'shared/constants/routes';
import { SidebarItemType } from './types';

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
