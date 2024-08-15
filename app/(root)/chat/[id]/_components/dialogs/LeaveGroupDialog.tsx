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

const LeaveGroupDialog = ({ chatId, open, setOpen }: Props) => {
	const { mutate: leaveGroup, pending } = useMutationState(api.chat.leaveGroup);

	const handleLeaveGroup = async () => {
		await leaveGroup({ chatId })
			.then(() => {
				toast.success('You has left group!');
			})
			.catch((error) => toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred!'));
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent className='border-0'>
				<AlertDialogHeader>
					<AlertDialogTitle>Leave group</AlertDialogTitle>
					<AlertDialogDescription>This action can not be undone. You will not be able to see any previous messages or send new message to this group!</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
					<AlertDialogAction disabled={pending} onClick={handleLeaveGroup}>
						Okay
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default LeaveGroupDialog;
