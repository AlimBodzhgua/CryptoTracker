import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender';
import { sidebarList } from '../../model/sidebarList';
import { SidebarItem } from './SidebarItem';

describe('Sidebaritem', () => {
	test('Component should render', () => {
		componentRender(<SidebarItem item={sidebarList[0]} />);
		expect(screen.getByTestId('sidebar-item')).toBeInTheDocument();
	});

	test('Component should collapsed', () => {
		componentRender(<SidebarItem item={sidebarList[0]} collapsed />);
		const item = screen.getByTestId('sidebar-item');
		expect(item).toBeInTheDocument();
		expect(item).toHaveClass('collapsed');
	});
});
