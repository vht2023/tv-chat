/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { MessageCircle, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const useNavigation = () => {
	const pathname = usePathname();
	const requestsCount = useQuery(api.requests.count);

	const paths = useMemo(
		() => [
			{
				name: 'Chat',
				href: '/chat',
				icon: <MessageCircle />,
				active: pathname.startsWith('/chat'),
			},
			{
				name: 'People',
				href: '/people',
				icon: <Users />,
				active: pathname.startsWith('/people'),
				count: requestsCount,
			},
		],
		[pathname, requestsCount]
	);
	return paths;
};

export default useNavigation;
