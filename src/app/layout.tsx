// src/app/layout.tsx

import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { BuildProvider } from '@/context/BuildContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <BuildProvider>
            {children}
          </BuildProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
