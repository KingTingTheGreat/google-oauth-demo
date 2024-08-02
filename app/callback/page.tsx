'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UserContext';
import { FAILURE_MESSAGE } from '@/constants';
import { getCSRFToken } from '@/hooks/csrfToken';

export default function GoogleCallback() {
  const userContext = useUserContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  useEffect(() => {
    const localState = getCSRFToken();
    if (!localState || localState !== state) {
      router.push('/');
    }

    const fetchSessionId = async () => {
      try {
        const res = await fetch(`/api/oauth-token`, {
          method: 'POST',
          body: JSON.stringify({ code }),
        });
        const data = await res.json();

        if (data === FAILURE_MESSAGE || !data.sessionId) {
          console.log('failure', data);
          router.push('/');
        }
        console.log('sessionId', data.sessionId);

        userContext.save({
          sessionId: data.sessionId,
          name: data.name,
          email: data.email,
        });
      } catch {
        router.push('/');
      }
    };
    fetchSessionId();
  }, []);

  return (
    <div>
      {code && state ? (
        <div>
          <h2>Successfully authenticated</h2>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
