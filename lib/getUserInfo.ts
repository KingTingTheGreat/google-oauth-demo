'use server';
import getCollection from '@/db';
import { USERS_COLLECTION } from '@/constants';
import { User } from '@/types';

export const getUserInfo = async (sessionId: string): Promise<User> => {
  const userCollection = await getCollection(USERS_COLLECTION);
  const userDocument = await userCollection.findOne({ sessionId });
  const user = {
    name: userDocument?.name,
    email: userDocument?.email,
  };
  console.log('getting user info', user);
  return user;
};
