'use client';

import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import AddPeopleDialog from './_components/AddPeopleDialog';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import Request from './_components/Request';
import Friend from './_components/Friend';

const LoadingSkeleton = () => (
	<div className='flex flex-col gap-3 mt-3'>
		<div className='px-2'>
			<div className='flex items-center space-x-3'>
				<Skeleton className='h-12 w-12 rounded-full bg-white/20' />
				<div className='space-y-2'>
					<Skeleton className='h-4 w-[200px] bg-white/20' />
					<Skeleton className='h-4 w-[160px] bg-white/20' />
				</div>
			</div>
		</div>
		<div className='px-2'>
			<div className='flex items-center space-x-3'>
				<Skeleton className='h-12 w-12 rounded-full bg-white/20' />
				<div className='space-y-2'>
					<Skeleton className='h-4 w-[200px] bg-white/20' />
					<Skeleton className='h-4 w-[160px] bg-white/20' />
				</div>
			</div>
		</div>
		<div className='px-2'>
			<div className='flex items-center space-x-3'>
				<Skeleton className='h-12 w-12 rounded-full bg-white/20' />
				<div className='space-y-2'>
					<Skeleton className='h-4 w-[200px] bg-white/20' />
					<Skeleton className='h-4 w-[160px] bg-white/20' />
				</div>
			</div>
		</div>
	</div>
);

const PeopleLayout = ({ children }: { children: React.ReactNode }) => {
	const requests = useQuery(api.requests.get);
	const friends = useQuery(api.friends.get);

	return (
		<div className='w-full h-full flex flex-row gap-3'>
			<Card className='bg-bgr-base text-white border-0 h-full w-1/4 min-w-[360px]'>
				<CardHeader className='space-y-3 p-4'>
					<CardTitle className='flex items-center justify-between'>
						People
						<AddPeopleDialog />
					</CardTitle>
					<div className='w-full relative'>
						<div className='absolute top-1/2 -translate-y-1/2 left-2'>
							<SearchIcon size={16} />
						</div>
						<Input
							type='text'
							placeholder='Search People'
							className='pl-8 outline-none border-0 focus-visible:border-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0'
						/>
					</div>
				</CardHeader>
				<CardContent className='flex flex-col overflow-y-auto p-0 px-2 h-[calc(100%-124px)] scrollbar-thin'>
					{!requests || !friends ? (
						<LoadingSkeleton />
					) : (
						<React.Fragment>
							{requests && requests.length === 0 && <div className='px-2 text-xs text-muted-foreground mb-3'>Friends request (0)</div>}
							{requests &&
								requests.map((item) => <Request key={item.request._id} id={item.request._id} imageUrl={item.sender.imageUrl} name={item.sender.name} email={item.sender.email} />)}

							{friends && friends.length === 0 && <div className='px-2 text-xs text-muted-foreground'>Active friends (0)</div>}
							{friends && friends.map((item) => <Friend key={item._id} id={item._id} imageUrl={item.imageUrl} name={item.name} email={item.email} />)}
						</React.Fragment>
					)}
				</CardContent>
			</Card>
			<div className='shrink h-full w-full'>{children}</div>
		</div>
	);
};

export default PeopleLayout;
