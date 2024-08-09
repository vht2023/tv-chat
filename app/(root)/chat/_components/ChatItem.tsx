import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';

type Props = {
	id: Id<'chats'>;
	imageUrl: string;
	name: string;
	lastMessageSender?: string;
	lastMessageContent?: string;
};

const ChatItem = ({ id, imageUrl, name, lastMessageSender, lastMessageContent }: Props) => {
	const params = useParams();
	const actived = useMemo(() => params?.id === id, [params, id]);

	return (
		<Link href={`/chat/${id}`} className={cn(['flex items-center p-2 text-sm gap-3 hover:bg-white/20 rounded-lg cursor-pointer', actived && 'bg-white/20'])}>
			<div className='min-w-12 w-12 min-h-12'>
				<Avatar className='w-12 h-12'>
					<AvatarImage src={imageUrl} />
					<AvatarFallback>
						<User />
					</AvatarFallback>
				</Avatar>
			</div>
			<div className='w-full truncate space-y-1.5'>
				<div className='truncate text-white/90 font-500'>{name}</div>
				<div className='truncate text-xs text-muted-foreground'>
					{lastMessageSender && lastMessageContent ? (
						<span className='w-full truncate'>
							{lastMessageSender}: {lastMessageContent}
						</span>
					) : (
						<span className='text-white font-700'>Start the chat!</span>
					)}
				</div>
			</div>
		</Link>
	);
};

export default ChatItem;
