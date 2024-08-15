import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { Dot, User } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';

type Props = {
	id: Id<'chats'>;
	name: string;
	lastMessageSender?: string;
	lastMessageContent?: string;
	unseen?: boolean;
};

const GroupChatItem = ({ id, name, lastMessageSender, lastMessageContent, unseen }: Props) => {
	const params = useParams();
	const actived = useMemo(() => params?.id === id, [params, id]);

	return (
		<Link href={`/chat/${id}`} className={cn(['flex items-center p-2 text-sm gap-3 hover:bg-white/20 rounded-lg cursor-pointer', actived && 'bg-white/20'])}>
			<div className='flex items-center gap-4'>
				<Avatar className='w-12 h-12 text-lg text-white font-500'>
					<AvatarFallback>{name.charAt(0).toLocaleUpperCase()}</AvatarFallback>
				</Avatar>
			</div>
			<div className='w-full truncate space-y-1.5'>
				<div className='truncate text-white/90 font-500'>{name}</div>
				<div className='truncate text-xs text-muted-foreground'>
					{lastMessageSender && lastMessageContent ? (
						<span className={cn(['w-full truncate', unseen && 'text-white font-700'])}>
							{lastMessageSender}: {lastMessageContent}
						</span>
					) : (
						<span className='text-white font-700'>Start the chat!</span>
					)}
				</div>
			</div>
			{unseen && (
				<div className='h-full flex-center'>
					<div className='w-2 h-2 rounded bg-bgr-blue-primary' />
				</div>
			)}
		</Link>
	);
};

export default GroupChatItem;
