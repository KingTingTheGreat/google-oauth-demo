'use client';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { UserContextProvider } from '@/context/UserContext';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <UserContextProvider>
        <html lang="en">
          <body
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              justifyContent: 'space-between',
            }}
          >
            <Header />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center',
              }}
            >
              {children}
            </div>
            <Footer />
          </body>
        </html>
      </UserContextProvider>
    </Suspense>
  );
}
