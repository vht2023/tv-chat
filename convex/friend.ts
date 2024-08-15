import { ConvexError, v } from 'convex/values';
import { mutation } from './_generated/server';
import { getUserByClerkId } from './_utils';

export const remove = mutation({
	args: {
		chatId: v.id('chats'),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError('Unauthorized!');
		}

		const currentUser = await getUserByClerkId({
			ctx,
			clerkId: identity.subject,
		});
		if (!currentUser) {
			throw new ConvexError('User not found!');
		}

		const chat = await ctx.db.get(args.chatId);
		if (!chat) {
			throw new ConvexError('This chat not found!');
		}

		const memberships = await ctx.db
			.query('chatMembers')
			.withIndex('by_chatId', (q) => q.eq('chatId', args.chatId))
			.collect();
		if (!memberships || memberships.length !== 2) {
			throw new ConvexError('This chat does have any members!');
		}

		const friendship = await ctx.db
			.query('friends')
			.withIndex('by_chatId', (q) => q.eq('chatId', args.chatId))
			.unique();
		if (!friendship) {
			throw new ConvexError('Friend could not be found!');
		}

		const messages = await ctx.db
			.query('messages')
			.withIndex('by_chatId', (q) => q.eq('chatId', args.chatId))
			.collect();
		await ctx.db.delete(args.chatId);
		await ctx.db.delete(friendship._id);

		await Promise.all(memberships.map(async (membership) => await ctx.db.delete(membership._id)));

		await Promise.all(messages.map(async (message) => await ctx.db.delete(message._id)));
	},
});

export const startChatWithFriend = mutation({
	args: {
		friendId: v.id('users'),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError('Unauthorized!');
		}

		const currentUser = await getUserByClerkId({
			ctx,
			clerkId: identity.subject,
		});
		if (!currentUser) {
			throw new ConvexError('User not found!');
		}

		const chatMemberships1 = await ctx.db
			.query('friends')
			.withIndex('by_user1_user2', (q) => q.eq('user1', currentUser._id).eq('user2', args.friendId))
			.collect();

		const chatMemberships2 = await ctx.db
			.query('friends')
			.withIndex('by_user2_user1', (q) => q.eq('user2', currentUser._id).eq('user1', args.friendId))
			.collect();

		const chatMemberships = [...chatMemberships1, ...chatMemberships2];

		if (chatMemberships.length === 0) {
			const chatId = await ctx.db.insert('chats', {
				isGroup: false,
			});
			await ctx.db.insert('chatMembers', {
				memberId: currentUser._id,
				chatId,
			});
			await ctx.db.insert('chatMembers', {
				memberId: args.friendId,
				chatId,
			});

			return { chatId };
		} else {
			return { chatId: chatMemberships[0].chatId };
		}
	},
});
