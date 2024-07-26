'use client';
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { useUserContext } from '@/context/UserContext';
import { getUserInfo } from '@/lib/getUserInfo';

export default function DashboardPage() {
  const userContext = useUserContext();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await getUserInfo(userContext.state.sessionId);
      setUser(userInfo);

      fetch('/api/users', { method: 'POST' })
        .then((res) => res.json())
        .then((data) => setUsers(data.users));
    };
    fetchData();
  }, [userContext.state.sessionId]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <h4>Users</h4>
          {users.length > 0 &&
            users.map((doc) => (
              <div key={doc.email}>
                <p style={{ color: user.name === doc.name ? 'red' : 'black' }}>
                  Name: {doc.name}
                </p>
                <p style={{ color: user.name === doc.name ? 'red' : 'black' }}>
                  Email: {doc.email}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
