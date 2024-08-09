import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Id } from '@/convex/_generated/dataModel';
import { User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
	id: Id<'chats'>;
	name?: string;
	imageUrl?: string;
};

const Header = ({ id, name, imageUrl }: Props) => {
	return (
		<div className='flex items-center justify-between'>
			<Link href={`chat/${id}`}>
				<div className='hover:bg-white/20 flex items-center gap-3 p-2 rounded-lg'>
					<Avatar className='min-w-10 min-h-10'>
						<AvatarImage src={imageUrl} />
						<AvatarFallback>{name?.substring(0, 1)}</AvatarFallback>
					</Avatar>
					<h2>{name}</h2>
				</div>
			</Link>
		</div>
	);
};

export default Header;
