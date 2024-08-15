import React, { useEffect } from 'react';
import ChatInput from './ChatInput';
import { useChat, useMutationState } from '@/hooks';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';
import Message from './Message';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

type ISeenUser = {
	lastSeenMessageId?: Id<'messages'>;
	name?: string;
	imageUrl?: string;
	[key: string]: any;
};

type Props = {
	members: ISeenUser[];
};

const LoadingSkeleton = () => (
	<div className='flex-1 overflow-y-auto w-full h-full flex flex-col-reverse gap-2 p-2 scrollbar-thin'>
		<div className='flex items-end space-x-3 w-full'>
			<Skeleton className='h-8 w-8 rounded-full bg-white/20' />
			<div className='flex flex-col space-y-3 w-full'>
				<Skeleton className='h-8 w-1/4 bg-white/20 rounded-bl-none' />
				<Skeleton className='h-8 w-1/3 bg-white/20 rounded-bl-none' />
			</div>
		</div>
		<div className='flex items-end justify-end space-x-3 w-full'>
			<div className='flex flex-col items-end space-y-3 w-full'>
				<Skeleton className='h-8 w-1/4 bg-white/20 rounded-br-none' />
				<Skeleton className='h-8 w-1/4 bg-white/20 rounded-br-none' />
				<Skeleton className='h-8 w-1/3 bg-white/20 rounded-br-none' />
			</div>
			<Skeleton className='h-8 w-8 rounded-full bg-white/20' />
		</div>
		<div className='flex items-end space-x-3 w-full'>
			<Skeleton className='h-8 w-8 rounded-full bg-white/20' />
			<div className='flex flex-col space-y-3 w-full'>
				<Skeleton className='h-8 w-1/4 bg-white/20 rounded-bl-none' />
				<Skeleton className='h-8 w-1/3 bg-white/20 rounded-bl-none' />
			</div>
		</div>
		<div className='flex items-end justify-end space-x-3 w-full'>
			<div className='flex flex-col items-end space-y-3 w-full'>
				<Skeleton className='h-8 w-1/2 bg-white/20 rounded-br-none' />
				<Skeleton className='h-8 w-1/3 bg-white/20 rounded-br-none' />
			</div>
			<Skeleton className='h-8 w-8 rounded-full bg-white/20' />
		</div>
	</div>
);

const Body = ({ members }: Props) => {
	const { chatId } = useChat();
	const messages = useQuery(api.messages.get, {
		id: chatId as Id<'chats'>,
	});

	const { mutate: markRead } = useMutationState(api.chat.markRead);

	useEffect(() => {
		if (messages && messages.length > 0) {
			markRead({ chatId, messageId: messages[0].message._id });
		}
	}, [messages?.length, chatId]);

	const getSeenMessage = (id: Id<'messages'>) => {
		const seenUsers = members.filter((member) => member.lastSeenMessageId === id);
		if (seenUsers.length === 0) return undefined;
		return seenUsers.map((u, index) => (
			<Tooltip delayDuration={100} key={index}>
				<TooltipContent className='text-xs'>Seen by {u.name}</TooltipContent>
				<TooltipTrigger asChild>
					<Avatar className='h-4 w-4'>
						<AvatarImage src={u.imageUrl} />
						<AvatarFallback>{u.name?.substring(0, 1)}</AvatarFallback>
					</Avatar>
				</TooltipTrigger>
			</Tooltip>
		));
	};

	return (
		<div className='flex flex-col h-full w-full'>
			{!messages ? (
				<LoadingSkeleton />
			) : (
				<React.Fragment>
					{messages.length === 0 && <div className='flex-center w-full h-full p-2 scrollbar-thin text-white/80'>Let&apos;s start chatting!</div>}
					{messages.length > 0 && (
						<div className='flex-1 overflow-y-auto w-full h-full flex flex-col-reverse gap-2 p-2 scrollbar-thin'>
							{messages.map(({ message, isCurrentUser, senderImage, senderName }, index) => {
								const lastByUser = messages[index - 1]?.message.senderId === messages[index]?.message.senderId;
								const seenMessage = getSeenMessage(message._id);
								return (
									<Message
										key={message._id}
										fromCurrentUser={isCurrentUser}
										senderImage={senderImage}
										senderName={senderName}
										lastByUser={lastByUser}
										content={message.content}
										createdAt={message._creationTime}
										type={message.type}
										seen={seenMessage}
									/>
								);
							})}
						</div>
					)}
				</React.Fragment>
			)}
			<ChatInput />
		</div>
	);
};

export default Body;
