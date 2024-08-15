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
	const chats = useQuery(api.chats.get);

	const unssenMessageCount = useMemo(() => chats?.reduce((acc, curr) => acc + curr.unssenCount, 0), [chats]);

	const paths = useMemo(
		() => [
			{
				name: 'Chat',
				href: '/chat',
				icon: <MessageCircle />,
				active: pathname.startsWith('/chat'),
				count: unssenMessageCount,
			},
			{
				name: 'People',
				href: '/people',
				icon: <Users />,
				active: pathname.startsWith('/people'),
				count: requestsCount,
			},
		],
		[pathname, requestsCount, unssenMessageCount]
	);
	console.log(paths);

	return paths;
};

export default useNavigation;
