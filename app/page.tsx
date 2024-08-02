'use client';
import { useUserContext } from '@/context/UserContext';
import { generateCSRFToken, storeCSRFToken } from '@/hooks/csrfToken';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const userContext = useUserContext();

  const handleSubmit = async () => {
    const csrfToken = generateCSRFToken();
    storeCSRFToken(csrfToken);
    const res = await fetch(`/api/oauth-token?csrfToken=${csrfToken}`);
    router.push(await res.json());
  };

  return (
    <div>
      <button
        style={{
          padding: '20px',
          backgroundColor: 'lightblue',
          borderRadius: '20px',
        }}
        onClick={() => handleSubmit()}
      >
        Sign In
      </button>
    </div>
  );
}
