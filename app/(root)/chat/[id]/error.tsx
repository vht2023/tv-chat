'use client';

import ChatFallback from '@/components/common/chat/ChatFallback';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error }: { error: Error }) {
	const router = useRouter();

	useEffect(() => {
		router.push('/chat');
	}, [error, router]);

	return <ChatFallback />;
}
