'use client';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { useUserContext } from '@/context/UserContext';
import { getUserInfo } from '@/lib/getUserInfo';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const userContext = useUserContext();
  const { name, email } = userContext.state;

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo(
        userContext.state.sessionId,
        userContext.state.email,
      );

      if (!userInfo) {
        userContext.save({ sessionId: '', email: '', name: '' });
        router.push('/');
        return;
      }

      console.log(userInfo);
      setUser(userInfo);
      userContext.save({ name: userInfo.name, email: userInfo.email });
    };
    fetchUser();
  }, [userContext.state.sessionId]);

  return (
    <div>
      <h1>This is your profile</h1>
      <div>
        <p>Name: {user?.name || name}</p>
        <p>Email: {user?.email || email}</p>
      </div>
    </div>
  );
};

export default Profile;
