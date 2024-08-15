import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutationState } from '@/hooks';
import { ConvexError } from 'convex/values';
import { User } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type Props = {
	id: Id<'users'>;
	imageUrl: string;
	name: string;
	email: string;
};

function Friend({ id, imageUrl, name, email }: Props) {
	const router = useRouter();

	const { mutate: startChatWithFriend } = useMutationState(api.friend.startChatWithFriend);

	const handleChatWithFriend = async () => {
		await startChatWithFriend({ friendId: id })
			.then((res) => {
				console.log(res);
				if (res.chatId) router.push(`chat/${res.chatId}`);
			})
			.catch((error) => toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred!'));
	};

	return (
		<div onClick={handleChatWithFriend} className='flex items-center p-2 text-sm gap-3 justify-between hover:bg-white/20 rounded-lg cursor-pointer'>
			<div className='flex items-center gap-3'>
				<Avatar className='min-w-12 min-h-12'>
					<AvatarImage src={imageUrl} />
					<AvatarFallback>
						<User />
					</AvatarFallback>
				</Avatar>
				<div className='flex flex-col justify-center gap-1 truncate'>
					<div className='truncate text-white/90 font-600'>{name}</div>
					<div className='truncate text-xs text-muted-foreground'>{email}</div>
				</div>
			</div>
		</div>
	);
}

export default Friend;
