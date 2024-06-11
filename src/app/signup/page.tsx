// src/app/signup/page.tsx
import React from 'react';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignUp path="/signup" routing="path" signInUrl="/login" />
    </div>
  );
}
