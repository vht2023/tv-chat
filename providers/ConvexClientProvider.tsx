'use client';

import React from 'react';

import { ClerkProvider, RedirectToSignIn, useAuth } from '@clerk/clerk-react';
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import LoadingLogo from '@/components/common/LoadingLogo';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

const ConvexClientProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''}>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<Unauthenticated>
					<RedirectToSignIn />
				</Unauthenticated>
				<Authenticated>{children}</Authenticated>
				<AuthLoading>
					<LoadingLogo />
				</AuthLoading>
				<ProgressBar height='4px' color='rgb(255 255 255 / 0.5)' startPosition={0.5} options={{ showSpinner: false }} shallowRouting />
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
};

export default ConvexClientProvider;
