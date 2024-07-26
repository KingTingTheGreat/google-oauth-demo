'use client';
import { useUserContext } from '@/context/UserContext';
import { generateCSRF } from '@/util/generateCSRF';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const userContext = useUserContext();

  const handleSubmit = async () => {
    console.log('signing in');
    const csrfToken = generateCSRF();
    userContext.save({ csrfToken: csrfToken });
    const res = await fetch(`/api/oauth-token?state=${csrfToken}`);
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
