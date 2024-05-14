import { screen } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import { SidebarItem } from './SidebarItem';
import { sidebarList } from 'constants/sidebarList';


describe('Sidebaritem', () => {
	test('Component should render', () => {
		componentRender(<SidebarItem item={sidebarList[0]}/>);
		expect(screen.getByTestId('sidebar-item')).toBeInTheDocument();
	});

	test('Component should collapsed', () => {
		componentRender(<SidebarItem item={sidebarList[0]} collapsed={true}/>);
		const item = screen.getByTestId('sidebar-item'); 
		expect(item).toBeInTheDocument();
		expect(item).toHaveClass('collapsed');
	});
})