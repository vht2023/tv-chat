import { v } from 'convex/values';
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

		const chat = await ctx.db.get(args.id);
		if (!chat) {
			throw new Error('Chat not found!');
		}

		const membership = await ctx.db
			.query('chatMembers')
			.withIndex('by_memberId_chatId', (q) => q.eq('memberId', currentUser._id).eq('chatId', chat._id))
			.unique();
		if (!membership) {
			throw new Error(`You aren't a member of this chat!`);
		}

		const allChatMemberships = await ctx.db
			.query('chatMembers')
			.withIndex('by_chatId', (q) => q.eq('chatId', args.id))
			.collect();

		if (!chat.isGroup) {
			const otherMembership = allChatMemberships.filter((membership) => membership.memberId !== currentUser._id)[0];
			const otherMemberDetails = await ctx.db.get(otherMembership.memberId);

			return { ...chat, otherMember: { ...otherMemberDetails, lastSeenMessageId: otherMembership.lastSeenMessage }, otherMembers: null };
		}
	},
});
