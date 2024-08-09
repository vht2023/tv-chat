import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutationState } from '@/hooks';
import { ConvexError } from 'convex/values';
import { Check, User, X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

type Props = {
	id: Id<'requests'>;
	imageUrl: string;
	name: string;
	email: string;
};

function Request({ id, imageUrl, name, email }: Props) {
	const { mutate: denyRequest, pending: denyPending } = useMutationState(api.request.deny);
	const { mutate: acceptRequest, pending: acceptPending } = useMutationState(api.request.accept);

	return (
		<div className='flex items-center p-2 text-sm gap-3 justify-between hover:bg-white/20 rounded-lg cursor-pointer'>
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
			<div className='flex items-center gap-2'>
				<Button
					size='icon'
					variant='ghost'
					className='w-8 h-8'
					disabled={denyPending || acceptPending}
					onClick={() => {
						acceptRequest({ id })
							.then(() => {
								toast.success('Friend request accepted!');
							})
							.catch((error: any) => {
								toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred!');
							});
					}}
				>
					<Check className='w-4 h-4' />
				</Button>
				<Button
					size='icon'
					variant='ghost'
					className='w-8 h-8'
					disabled={denyPending || acceptPending}
					onClick={() => {
						denyRequest({ id })
							.then(() => {
								toast.success('Friend request denied!');
							})
							.catch((error: any) => {
								toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred!');
							});
					}}
				>
					<X className='w-4 h-4' />
				</Button>
			</div>
		</div>
	);
}

export default Request;
