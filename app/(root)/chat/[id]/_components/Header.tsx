import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { Ellipsis, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
	id: Id<'chats'>;
	name?: string;
	imageUrl?: string;
	options?: {
		label: string;
		destructive: boolean;
		onClick: () => void;
	}[];
};

const Header = ({ id, name, imageUrl, options }: Props) => {
	return (
		<div className='flex items-center justify-between w-full'>
			<Link href={`chat/${id}`}>
				<div className='hover:bg-white/20 flex items-center gap-3 p-2 rounded-lg'>
					<Avatar className='min-w-10 min-h-10'>
						<AvatarImage src={imageUrl} />
						<AvatarFallback>{name?.substring(0, 1)}</AvatarFallback>
					</Avatar>
					<h2>{name}</h2>
				</div>
			</Link>
			{options && (
				<div className='flex gap-2'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' size='icon' className='rounded-full hover:bg-white/20'>
								<Ellipsis />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='border-0'>
							{options.map((option, index) => (
								<DropdownMenuItem key={index} onClick={option.onClick} className={cn(['font-semibold', option.destructive && 'text-destructive'])}>
									{option.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}
		</div>
	);
};

export default Header;
