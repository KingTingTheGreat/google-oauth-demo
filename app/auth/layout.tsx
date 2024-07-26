export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <h2>Authorized Users Only</h2>
      {children}
    </>
  );
}
