/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useChat = () => {
	const params = useParams();
	const chatId = useMemo(() => params?.id || '', [params?.id]);
	const isActive = useMemo(() => !!chatId, [chatId]);

	return {
		chatId,
		isActive,
	};
};

export default useChat;
