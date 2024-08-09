import { ConvexError, v } from 'convex/values';
import { query } from './_generated/server';
import { getUserByClerkId } from './_utils';

export const get = query({
	args: {
		id: v.id('chats'),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthorized!');
		}

		const currentUser = await getUserByClerkId({ ctx, clerkId: identity.subject });
		if (!currentUser) {
			throw new Error('User not found!');
		}

		const chatMembership = await ctx.db
			.query('chatMembers')
			.withIndex('by_memberId_chatId', (q) => q.eq('memberId', currentUser._id).eq('chatId', args.id))
			.unique();
		if (!chatMembership) {
			throw new Error(`You aren't a member of this chat!`);
		}

		const messages = await ctx.db
			.query('messages')
			.withIndex('by_chatId', (q) => q.eq('chatId', args.id))
			.order('desc')
			.collect();

		const messagesWithUser = await Promise.all(
			messages?.map(async (message) => {
				const msgSender = await ctx.db.get(message.senderId);
				if (!msgSender) {
					throw new Error('Could not find sender of message!');
				}
				return {
					...message,
					senderImage: msgSender.imageUrl,
					senderName: msgSender.name,
					isCurrentUser: msgSender._id === currentUser._id,
				};
			})
		);

		return messagesWithUser;
	},
});
