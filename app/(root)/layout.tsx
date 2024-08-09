import React from 'react';

import SideBarWrapper from '@/components/common/sidebar/SidebarWrapper';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return <SideBarWrapper>{children}</SideBarWrapper>;
};

export default AppLayout;
