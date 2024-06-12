// src/app/layout.tsx

import './globals.css';
import { BuildProvider } from '@/context/BuildContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BuildProvider>
          {children}
        </BuildProvider>
      </body>
    </html>
  );
}
