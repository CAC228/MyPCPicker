// src/app/login/[[...rest]]/page.tsx

import React from 'react';
import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignIn path="/login" routing="path" signUpUrl="/signup" />
    </div>
  );
}
