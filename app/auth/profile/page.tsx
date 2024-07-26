'use client';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { useUserContext } from '@/context/UserContext';
import { getUserInfo } from '@/lib/getUserInfo';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const userContext = useUserContext();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo(userContext.state.sessionId);
      console.log(userInfo);
      setUser(userInfo);
    };
    fetchUser();
  }, [userContext.state.sessionId]);

  return (
    <div>
      <h1>This is your profile</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}
