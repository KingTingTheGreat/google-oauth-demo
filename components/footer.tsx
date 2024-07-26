'use client';
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const userContext = useUserContext();
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
          userContext.save({ sessionId: '' });
          router.push('/');
        }}
      >
        Sign Out
      </p>
    </footer>
  );
};

export default Footer;
