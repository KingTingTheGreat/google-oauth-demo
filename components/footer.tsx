'use client';
import { clearCookie } from '@/lib/cookie';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  return (
    <footer>
      <p
        style={{
          padding: '0.5rem',
          backgroundColor: 'pink',
          width: 80,
          textAlign: 'center',
        }}
        onClick={() => {
          clearCookie();
          router.push('/');
        }}
      >
        Sign Out
      </p>
    </footer>
  );
};

export default Footer;
