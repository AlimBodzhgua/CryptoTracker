import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from 'features/sidebar';
import { Header } from 'features/header';
import { AuthActionsMenu } from 'features/user';
import { CurrencySwitcher } from 'features/currency';
import { LangSwitcher } from 'features/lang-switcher';
import classes from './MainLayout.module.scss';

export const MainLayout: FC = () => (
	<div className={classes.MainLayout}>
		<Sidebar />
		<div className={classes.MainLayoutInner}>
			<Header
				elements={
					<>
						<AuthActionsMenu />
						<CurrencySwitcher />
						<LangSwitcher />
					</>
				}
			/>
			<Outlet />
		</div>
	</div>
);
