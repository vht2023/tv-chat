import React from 'react';
import ChatInput from './ChatInput';
import { useChat } from '@/hooks';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';
import Message from './Message';

const Body = () => {
	const { chatId } = useChat();
	const messages = useQuery(api.messages.get, {
		id: chatId as Id<'chats'>,
	});

	return (
		<div className='flex flex-col h-full w-full'>
			<div className='flex-1 overflow-y-auto w-full h-full flex flex-col-reverse gap-2 p-2 scrollbar-thin'>
				{messages &&
					messages.map((message, index) => {
						const lastByUser = messages[index - 1]?.senderId === messages[index]?.senderId;
						return (
							<Message
								key={message._id}
								fromCurrentUser={message.isCurrentUser}
								senderImage={message.senderImage}
								senderName={message.senderName}
								lastByUser={lastByUser}
								content={message.content}
								createdAt={message._creationTime}
								type={message.type}
							/>
						);
					})}
			</div>
			<ChatInput />
		</div>
	);
};

export default Body;
