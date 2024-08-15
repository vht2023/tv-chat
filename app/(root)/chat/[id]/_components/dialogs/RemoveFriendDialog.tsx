'use client';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutationState } from '@/hooks';
import { ConvexError } from 'convex/values';
import React from 'react';
import { toast } from 'sonner';

type Props = {
	chatId: Id<'chats'>;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RemoveFriendDialog = ({ chatId, open, setOpen }: Props) => {
	const { mutate: removeFriend, pending } = useMutationState(api.friend.remove);

	const handleRemoveFriend = async () => {
		await removeFriend({ chatId })
			.then(() => {
				toast.success('Removed friend successfully!');
			})
			.catch((error) => toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred!'));
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent className='border-0'>
				<AlertDialogHeader>
					<AlertDialogTitle>Remove friend</AlertDialogTitle>
					<AlertDialogDescription>
						This action can not be undone. All messages will be deleted and you will not be able to message this user. All group chats will still work!
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
					<AlertDialogAction disabled={pending} onClick={handleRemoveFriend}>
						Okay
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default RemoveFriendDialog;
