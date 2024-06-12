// src/utils/clerk.js
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useRouter } from 'next/router';

const frontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

export const withClerk = (Component) => (props) => {
  const router = useRouter();

  return (
    <ClerkProvider frontendApi={frontendApi} navigate={(to) => router.push(to)}>
      <SignedIn>
        <Component {...props} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
};
