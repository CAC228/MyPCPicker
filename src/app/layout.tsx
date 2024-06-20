// src/app/layout.tsx

import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { BuildProvider } from '@/context/BuildContext';
import { ComparisonProvider } from '@/context/ComparisonContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
        <ComparisonProvider>
          <BuildProvider>
            {children}
          </BuildProvider>
        </ComparisonProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
