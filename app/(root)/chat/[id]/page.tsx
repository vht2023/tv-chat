'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';
import Header from './_components/Header';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Skeleton } from '@/components/ui/skeleton';
import Body from './_components/Body';

type Props = {
	params: { id: Id<'chats'> };
};

const ChatDetailsPage = ({ params }: Props) => {
	const chat = useQuery(api.chat.get, { id: params.id });

	return (
		<Card className='bg-bgr-base text-white border-0 h-full w-full'>
			<CardHeader className='space-y-3 p-2 flex-row justify-between items-center border-b border-white/10'>
				{!chat && (
					<div className='flex rounded-lg items-center gap-3 p-2'>
						<Skeleton className='min-h-10 min-w-10 rounded-full bg-white/20' />
						<Skeleton className='h-4 w-[100px] bg-white/20' />
					</div>
				)}
				{chat && <Header id={chat._id} name={chat?.isGroup ? chat.name : chat.otherMember.name} imageUrl={chat?.isGroup ? undefined : chat.otherMember?.imageUrl} />}
			</CardHeader>
			<CardContent className='p-0 h-[calc(100%-73px)]'>
				<Body />
			</CardContent>
		</Card>
	);
};

export default ChatDetailsPage;
