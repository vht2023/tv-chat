import React, { PropsWithChildren } from 'react';
import DesktopSidebar from './DesktopSidebar';

type Props = PropsWithChildren<{}>;

const SideBarWrapper = ({ children }: Props) => {
	return (
		<div className='h-full w-full p-4 flex flex-col lg:flex-row gap-4'>
			<DesktopSidebar />
			<div className='w-full h-full'>{children}</div>
		</div>
	);
};

export default SideBarWrapper;
