'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { api } from '@/convex/_generated/api';
import { useMutationState } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from 'convex/react';
import { ConvexError } from 'convex/values';
import { SquarePen, X } from 'lucide-react';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const createGroupFormSchema = z.object({
	name: z.string().min(1, { message: `This field can't be empty!` }),
	members: z.string().array().min(1, { message: `You must select at least 1 friend!` }),
});

const CreateGroupDialog = () => {
	const friends = useQuery(api.friends.get);
	const { mutate: createGroup, pending } = useMutationState(api.friends.createGroup);

	const form = useForm<z.infer<typeof createGroupFormSchema>>({ resolver: zodResolver(createGroupFormSchema), defaultValues: { name: '', members: [] } });

	const members = form.watch('members');

	const unSelectedFriends = useMemo(() => (friends ? friends.filter((f) => !members.includes(f._id)) : []), [friends, members]);

	const handleSubmit = async (values: z.infer<typeof createGroupFormSchema>) => {
		await createGroup({ name: values.name, members: values.members })
			.then(() => {
				toast.success('Group created successfully!');
				form.reset()
			})
			.catch((error) => toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred!'));
	};

	return (
		<Dialog onOpenChange={() => form.reset()}>
			<Tooltip>
				<TooltipTrigger>
					<Button size='icon' variant='ghost' className='rounded-full hover:bg-white/20'>
						<DialogTrigger>
							<SquarePen className='w-5 h-5' />
						</DialogTrigger>
					</Button>
				</TooltipTrigger>
				<TooltipContent>New group chat</TooltipContent>
			</Tooltip>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create group chat</DialogTitle>
					<DialogDescription>Add your friends to get started!</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form className='space-y-8' onSubmit={form.handleSubmit(handleSubmit)}>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder='Enter group name...' />
									</FormControl>
									<FormMessage className='text-red-500' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='members'
							render={() => (
								<FormItem>
									<div className='flex items-center justify-between'>
										<FormLabel>Friends</FormLabel>
										<FormControl>
											<DropdownMenu>
												<DropdownMenuTrigger disabled={unSelectedFriends.length === 0} className='space-y-0' asChild>
													<Button className='text-sm font-400' variant='ghost'>Select friend</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent>
													{unSelectedFriends.map((friend) => (
														<DropdownMenuCheckboxItem
															key={friend._id}
															className='flex items-center gap-2 w-full p-2'
															onCheckedChange={(checked) => {
																if (checked) {
																	form.setValue('members', [...members, friend._id]);
																}
															}}
														>
															<Avatar className='w-8 h-8'>
																<AvatarImage src={friend.imageUrl} />
																<AvatarFallback>{friend.name?.substring(0, 1)}</AvatarFallback>
															</Avatar>
															<div className='text-sm'>{friend.name}</div>
														</DropdownMenuCheckboxItem>
													))}
												</DropdownMenuContent>
											</DropdownMenu>
										</FormControl>
									</div>
									<FormMessage className='text-red-500' />
								</FormItem>
							)}
						/>
						{members && members.length > 0 && (
							<div className='flex items-center gap-3 w-full flex-wrap'>
								{friends
									?.filter((item) => members.includes(item._id))
									.map((friend) => (
										<div key={friend._id} className='flex flex-col items-center gap-1'>
											<div className='relative'>
												<Avatar className='w-8 h-8'>
													<AvatarImage src={friend.imageUrl} />
													<AvatarFallback>{friend.name?.substring(0, 1)}</AvatarFallback>
												</Avatar>
												<X
													className='text-white w-4 h-4 absolute bottom-6 left-5 bg-muted rounded-full cursor-pointer'
													onClick={() => form.setValue('members', members.filter(id => id !== friend._id))}
												/>
											</div>
											<p className='truncate text-sm mt-1'>{friend.name.split(' ')[0]}</p>
										</div>
									))}
							</div>
						)}
						<DialogFooter>
							<Button disabled={pending} type='submit' className='w-full'>
								Send
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateGroupDialog;
