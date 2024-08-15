'use client';

import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { api } from '@/convex/_generated/api';
import { useChat, useMutationState } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { ConvexError } from 'convex/values';
import { SendHorizontal } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const chatMesageSchema = z.object({
	content: z.string().min(1, { message: `This field can't be empty!` }),
});

const ChatInput = () => {
	const { chatId } = useChat();
	const { mutate: createMessage, pending } = useMutationState(api.message.create);

	const form = useForm<z.infer<typeof chatMesageSchema>>({ resolver: zodResolver(chatMesageSchema), defaultValues: { content: '' } });

	const handleSubmit = async (values: z.infer<typeof chatMesageSchema>) => {
		await createMessage({ chatId, type: 'text', content: [values.content] })
			.then(() => {
				form.reset();
			})
			.catch((error) => toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occurred!'));
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value, selectionStart } = event.target;
		if (selectionStart !== null) {
			form.setValue('content', value);
		}
	};

	return (
		<div className='p-2'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='flex items-center gap-3 w-full justify-between'>
					<FormField
						control={form.control}
						name='content'
						render={({ field }) => (
							<FormItem className='w-full flex-1'>
								<FormControl>
									<AutosizeTextarea
										{...field}
										style={{
											resize: 'none',
										}}
										autoFocus
										minHeight={36}
										maxHeight={108}
										placeholder='Aa'
										className='bg-white/15 outline-none rounded-xl border-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
										onChange={handleInputChange}
										onKeyDown={async (event) => {
											if (event.key === 'Enter' && !event.shiftKey) {
												event.preventDefault();
												await form.handleSubmit(handleSubmit)();
											}
										}}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button size='icon' type='submit' variant='ghost' disabled={pending} className='rounded-full hover:bg-white/20'>
						<SendHorizontal className='w-5 h-5' />
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default ChatInput;
