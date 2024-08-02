'use server';
import getCollection from '@/db';
import { USERS_COLLECTION } from '@/constants';
import { User } from '@/types';

export const getUserInfo = async (
  sessionId: string,
  email: string,
): Promise<User | null> => {
  const userCollection = await getCollection(USERS_COLLECTION);
  const userDocument = await userCollection.findOne({ sessionId, email });

  if (!userDocument) {
    return null;
  }

  const user = {
    name: userDocument?.name,
    email: userDocument?.email,
  };
  console.log('getting user info', user);
  return user;
};
