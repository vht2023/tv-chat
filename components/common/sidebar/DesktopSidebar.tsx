'use client';

import React from 'react';

import { useNavigation } from '@/hooks';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { UserButton } from '@clerk/clerk-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const DesktopSidebar = () => {
	const paths = useNavigation();
	return (
		<div className='hidden lg:flex flex-col justify-between h-full'>
			<div className='flex flex-col'>
				{paths.map((path) => (
					<Link key={path.href} href={path.href}>
						<Tooltip delayDuration={100}>
							<TooltipContent>{path.name}</TooltipContent>
							<TooltipTrigger className='cursor-pointer'>
								<div className={cn(['p-3 rounded-lg hover:bg-white/20 relative', path.active && 'bg-white/20'])}>
									{path.icon}
									{!!path.count && <Badge className='absolute rounded-full flex-center w-6 h-6 -right-2 -top-2'>{path.count}</Badge>}
								</div>
							</TooltipTrigger>
						</Tooltip>
					</Link>
				))}
			</div>
			<div className='flex-center'>
				<UserButton />
			</div>
		</div>
	);
};

export default DesktopSidebar;
