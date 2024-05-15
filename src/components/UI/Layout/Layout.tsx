import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from 'components/Sidebar';
import { Navbar } from 'components/Navbar/Navbar';
import classes from './Layout.module.scss';

export const Layout: React.FC = () => (
	<div className={classes.Layout}>
		<Sidebar />
		<div className={classes.LayoutInner}>
			<Navbar />
			<Outlet />
		</div>
	</div>
);
