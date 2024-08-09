import React from 'react';

import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
	fromCurrentUser: boolean;
	senderImage: string;
	senderName: string;
	lastByUser: boolean;
	content: string[];
	createdAt: number;
	type: string;
};

const Message = ({ fromCurrentUser, senderImage, senderName, lastByUser, content, createdAt, type }: Props) => {
	const formatTime = (timestamp: number) => format(timestamp, 'HH:mm');
	return (
		<div className={cn(['flex items-end w-full', fromCurrentUser && 'justify-end'])}>
			<Avatar className={cn(['min-w-8 min-h-8 h-8 w-8', fromCurrentUser ? 'hidden' : 'flex'])}>
				<AvatarImage src={senderImage} />
				<AvatarFallback>{senderName?.substring(0, 1)}</AvatarFallback>
			</Avatar>
			<div className={cn(['flex flex-col w-full ml-2', fromCurrentUser ? 'order-1 items-end' : 'order-2 items-start'])}>
				<Tooltip delayDuration={100}>
					<TooltipContent side={fromCurrentUser ? 'left' : 'right'}>{formatTime(createdAt)}</TooltipContent>
					<TooltipTrigger
						asChild
						className={cn([
							'px-3 py-1.5 rounded-lg max-w-[70%] text-secondary-foreground',
							fromCurrentUser ? 'bg-[#0084FF]' : 'bg-white/20',
							!fromCurrentUser && !lastByUser && 'rounded-bl-none',
							fromCurrentUser && !lastByUser && 'rounded-br-none',
						])}
					>
						{type === 'text' && <div className='text-wrap break-words whitespace-pre-wrap'>{content}</div>}
					</TooltipTrigger>
				</Tooltip>
			</div>
		</div>
	);
};

export default Message;
