import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from 'features/sidebar';
import { Header } from 'features/header';
import { AuthActionsMenu } from 'features/user';
import { CurrencySwitcher } from 'features/currency';
import { LangSwitcher } from 'features/lang-switcher';
import classes from './Layout.module.scss';

export const Layout: React.FC = () => (
	<div className={classes.Layout}>
		<Sidebar />
		<div className={classes.LayoutInner}>
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
