import { ReactElement, SVGProps } from 'react';

export interface SidebarItemType {
	text: string;
	path: string;
	Icon: (props: SVGProps<SVGElement>) => ReactElement
}
