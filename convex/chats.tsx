import { Id } from './_generated/dataModel';
import { MutationCtx, QueryCtx } from './_generated/server';
import { query } from './_generated/server';
import { getUserByClerkId } from './_utils';

export const get = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized!');
		}

		const currentUser = await getUserByClerkId({ ctx, clerkId: identity.subject });
		if (!currentUser) {
			throw new Error('User not found!');
		}

		const chatMemberships = await ctx.db
			.query('chatMembers')
			.withIndex('by_memberId', (q) => q.eq('memberId', currentUser._id))
			.collect();

		const chats = await Promise.all(
			chatMemberships?.map(async (membership) => {
				const chat = await ctx.db.get(membership.chatId);
				if (!chat) {
					throw new Error('Chat could not be found!');
				}
				return chat;
			})
		);

		const chatWithDetails = Promise.all(
			chats?.map(async (chat) => {
				const allChatMemberships = await ctx.db
					.query('chatMembers')
					.withIndex('by_chatId', (q) => q.eq('chatId', chat?._id))
					.collect();

				const lastMessage = await getLastMessageDetails({ ctx, id: chat.lastMessageId });

				if (chat.isGroup) {
					return { chat, lastMessage };
				} else {
					const otherMembership = allChatMemberships.filter((membership) => membership.memberId !== currentUser._id)[0];
					const otherMember = await ctx.db.get(otherMembership.memberId);
					return {
						chat,
						otherMember,
						lastMessage,
					};
				}
			})
		);

		return chatWithDetails;
	},
});

export const getLastMessageDetails = async ({ ctx, id }: { ctx: QueryCtx | MutationCtx; id: Id<'messages'> | undefined }) => {
	if (!id) return null;

	const message = await ctx.db.get(id);
	if (!message) return null;

	const sender = await ctx.db.get(message.senderId);
	if (!sender) return null;

	const content = getMessageContent(message.type, message.content as unknown as string);

	return {
		content,
		sender: sender.name,
	};
};

const getMessageContent = (type: string, content: string) => {
	switch (type) {
		case 'text':
			return content;

		default:
			return '[Non-text]';
	}
};
