'use client';

import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import ChatItem from './_components/ChatItem';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
	const chats = useQuery(api.chats.get);

	return (
		<div className='w-full h-full flex flex-row gap-3'>
			<Card className='bg-bgr-base text-white border-0 h-full w-[400px]'>
				<CardHeader className='space-y-3 p-4'>
					<CardTitle>Chats</CardTitle>
					<div className='w-full relative'>
						<div className='absolute top-1/2 -translate-y-1/2 left-2 text-white/50'>
							<SearchIcon size={16} />
						</div>
						<Input
							type='text'
							placeholder='Search Messenger'
							className='bg-white/15 pl-8 outline-none border-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
						/>
					</div>
				</CardHeader>
				<CardContent className='flex flex-col overflow-y-auto p-0 px-2 h-[calc(100%-124px)] scrollbar-thin'>
					{!chats && (
						<React.Fragment>
							<div className='p-2'>
								<div className='flex items-center space-x-3'>
									<Skeleton className='min-h-12 min-w-12 rounded-full bg-white/20' />
									<div className='space-y-2 w-full'>
										<Skeleton className='h-4 w-[100px] bg-white/20' />
										<Skeleton className='h-4 w-full bg-white/20' />
									</div>
								</div>
							</div>
							<div className='p-2'>
								<div className='flex items-center space-x-3'>
									<Skeleton className='min-h-12 min-w-12 rounded-full bg-white/20' />
									<div className='space-y-2 w-full'>
										<Skeleton className='h-4 w-[100px] bg-white/20' />
										<Skeleton className='h-4 w-full bg-white/20' />
									</div>
								</div>
							</div>
							<div className='p-2'>
								<div className='flex items-center space-x-3'>
									<Skeleton className='min-h-12 min-w-12 rounded-full bg-white/20' />
									<div className='space-y-2 w-full'>
										<Skeleton className='h-4 w-[100px] bg-white/20' />
										<Skeleton className='h-4 w-full bg-white/20' />
									</div>
								</div>
							</div>
						</React.Fragment>
					)}

					{chats && chats.length === 0 && <div className='px-2 text-sm'>No chats</div>}

					{chats &&
						chats.map((item) => (
							<ChatItem
								key={item.chat._id}
								id={item.chat._id}
								imageUrl={item.otherMember?.imageUrl || ''}
								name={item.otherMember?.name || ''}
								lastMessageSender={item?.lastMessage?.sender}
								lastMessageContent={item?.lastMessage?.content}
							/>
						))}
				</CardContent>
			</Card>
			<div className='flex-1 h-full w-full'>{children}</div>
		</div>
	);
};

export default ChatLayout;
