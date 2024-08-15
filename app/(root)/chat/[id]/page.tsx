'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React, { useMemo, useState } from 'react';
import Header from './_components/Header';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Skeleton } from '@/components/ui/skeleton';
import Body from './_components/Body';
import RemoveFriendDialog from './_components/dialogs/RemoveFriendDialog';
import DeleteGroupDialog from './_components/dialogs/DeleteGroupDialog';
import LeaveGroupDialog from './_components/dialogs/LeaveGroupDialog';

type Props = {
	params: { id: Id<'chats'> };
};

enum ECallType {
	AUDIO = 'audio',
	VIDEO = 'video',
}

const ChatDetailsPage = ({ params }: Props) => {
	const chat = useQuery(api.chat.get, { id: params.id });

	const [removeFriendOpenDialog, setRemoveFriendOpenDialog] = useState<boolean>(false);
	const [deleteGroupOpenDialog, setDeleteGroupOpenDialog] = useState<boolean>(false);
	const [leaveGroupOpenDialog, setLeaveGroupOpenDialog] = useState<boolean>(false);
	const [callType, setCallType] = useState<ECallType | null>(null);

	const options = useMemo(
		() =>
			chat?.isGroup
				? [
						{ label: 'Leave group', destructive: false, onClick: () => setLeaveGroupOpenDialog(true) },
						{ label: 'Delete group', destructive: true, onClick: () => setDeleteGroupOpenDialog(true) },
					]
				: [{ label: 'Remove friend', destructive: false, onClick: () => setRemoveFriendOpenDialog(true) }],
		[chat]
	);

	return (
		<React.Fragment>
			<Card className='bg-bgr-base text-white border-0 h-full w-full'>
				<CardHeader className='space-y-3 p-2 flex-row w-full justify-between items-center border-b border-white/10'>
					{!chat && (
						<div className='flex rounded-lg items-center gap-3 p-2'>
							<Skeleton className='min-h-10 min-w-10 rounded-full bg-white/20' />
							<Skeleton className='h-4 w-[100px] bg-white/20' />
						</div>
					)}
					{chat && (
						<Header id={chat._id} name={chat?.isGroup ? chat.name : chat?.otherMember?.name} imageUrl={chat?.isGroup ? undefined : chat.otherMember?.imageUrl} options={options} />
					)}
				</CardHeader>
				<CardContent className='p-0 h-[calc(100%-73px)]'>
					<Body members={chat?.isGroup ? (chat.otherMembers ? chat.otherMembers : []) : chat?.otherMember ? [chat?.otherMember] : []} />
				</CardContent>
			</Card>
			{chat && (
				<React.Fragment>
					<RemoveFriendDialog chatId={chat?._id} open={removeFriendOpenDialog} setOpen={setRemoveFriendOpenDialog} />
					<DeleteGroupDialog chatId={chat?._id} open={deleteGroupOpenDialog} setOpen={setDeleteGroupOpenDialog} />
					<LeaveGroupDialog chatId={chat?._id} open={leaveGroupOpenDialog} setOpen={setLeaveGroupOpenDialog} />
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default ChatDetailsPage;
