import dynamic from 'next/dynamic';

export default function ProfilePage() {
  const NoSsrProfile = dynamic(() => import('@/components/profile'), {
    ssr: false,
  });
  return <NoSsrProfile />;
}
