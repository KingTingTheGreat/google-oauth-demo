import { COOKIE_NAME, USERS_COLLECTION } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';
import getCollection from '@/db';
import { User } from '@/types';

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME);

  if (!cookie) {
    console.log('no cookie');
    return NextResponse.json({ users: [] });
  }
  const { sessionId } = JSON.parse(cookie.value);

  if (!sessionId) {
    console.log('no session id');
    return NextResponse.json({ users: [] });
  }

  const userCollection = await getCollection(USERS_COLLECTION);
  const userDocument = await userCollection.findOne({ sessionId });

  if (!userDocument) {
    console.log('invalid session id');
    return NextResponse.json({ users: [] });
  }

  console.log('finding user documents');
  const userDocuments = await userCollection.find().toArray();

  console.log('cleaning users');
  const users: User[] = [];
  userDocuments.map((doc) => users.push({ email: doc.email, name: doc.name }));

  console.log('returning users', users);

  return NextResponse.json({ users });
}
