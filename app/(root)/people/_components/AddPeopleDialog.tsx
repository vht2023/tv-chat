'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutationState } from '@/hooks';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { ConvexError } from 'convex/values';

const addPeopleFormSchema = z.object({
	email: z.string().min(1, { message: `This field can't be empty!` }).email('Please enter a valid email!'),
});

const AddPeopleDialog = () => {
	const { mutate: createRequest, pending } = useMutationState(api.request.create);

	const form = useForm<z.infer<typeof addPeopleFormSchema>>({ resolver: zodResolver(addPeopleFormSchema), defaultValues: { email: '' } });

	const handleSubmit = async (values: z.infer<typeof addPeopleFormSchema>) => {
		await createRequest({ email: values.email })
			.then(() => {
				form.reset();
				toast.success('Friend request sent!');
			})
			.catch((error) => toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred!'));
	};

	return (
		<Dialog onOpenChange={() => form.reset()}>
			<Tooltip>
				<TooltipTrigger>
					<Button size='icon' variant='ghost'>
						<DialogTrigger>
							<UserPlus />
						</DialogTrigger>
					</Button>
				</TooltipTrigger>
				<TooltipContent>Add People</TooltipContent>
			</Tooltip>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add People</DialogTitle>
					<DialogDescription>Send a request to connect with your friends!</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form className='space-y-8' onSubmit={form.handleSubmit(handleSubmit)}>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} placeholder='Enter email...' />
									</FormControl>
									<FormMessage className='text-red-500' />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button disabled={pending} type='submit'>
								Send
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddPeopleDialog;
