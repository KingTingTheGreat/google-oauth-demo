'use client'
import { UserContextProvider } from '@/context/UserContext'
import Link from 'next/link'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <UserContextProvider>
      <html lang="en">
        <body>
          <header>
            <Link href="/">Home</Link>
            <Link href="/auth/profile">Profile</Link>
          </header>
          {children}
        </body>
      </html>
    </UserContextProvider>
  )
}
