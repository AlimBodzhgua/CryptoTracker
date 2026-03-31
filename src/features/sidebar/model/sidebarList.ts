import {
	getRouteCoins,
	getRouteConverter,
	getRouteMain,
	getRouteProfile,
	getRouteWatchList,
} from 'shared/constants/routes';
import CoinLogo from '../assets/coin.svg';
import ProfileLogo from '../assets/profile.svg';
import NewsLogo from '../assets/star.svg';
import MainLogo from '../assets/main.svg';
import ConverterLogo from '../assets/swap.svg';
import { SidebarItemType } from './types';

export const sidebarList: SidebarItemType[] = [
	{
		text: 'navigation.main',
		path: getRouteMain(),
		Icon: MainLogo,
	},
	{
		text: 'navigation.coins',
		path: getRouteCoins(),
		Icon: CoinLogo,
	},
	{
		text: 'navigation.watchlist',
		path: getRouteWatchList(),
		Icon: NewsLogo,
	},
	{
		text: 'navigation.converter',
		path: getRouteConverter(),
		Icon: ConverterLogo,
	},
	{
		text: 'navigation.profile',
		path: getRouteProfile(),
		Icon: ProfileLogo,
	},
];
