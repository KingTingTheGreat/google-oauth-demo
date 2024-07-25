"use client";
import { UserContextProvider } from "@/context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </UserContextProvider>
  );
}
