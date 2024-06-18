import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(() => {
  return NextResponse.next();
});

// This function can be marked `async` if using `await` inside
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next|static|favicon.ico).*)',
  ],
};
