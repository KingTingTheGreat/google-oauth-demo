import {
  CLIENT_ID,
  CLIENT_SECRET,
  FAILURE_MESSAGE,
  REDIRECT_URI,
  CSRF_TOKEN_LENGTH,
} from '@/constants';
import { generateSessionId } from '@/util/generateSessionId';
import { NextRequest, NextResponse } from 'next/server';
import getCollection from '@/db';

export async function GET(req: NextRequest) {
  const csrfToken = req.nextUrl.searchParams.get('csrfToken');
  if (!csrfToken || csrfToken.length !== CSRF_TOKEN_LENGTH) {
    return NextResponse.redirect('/');
  }

  const queryParams = new URLSearchParams({
    scope:
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    response_type: 'code',
    access_type: 'offline',
    state: csrfToken,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
  });

  return NextResponse.json(
    `https://accounts.google.com/o/oauth2/auth?${queryParams.toString()}`,
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { code } = body;
  if (!body.code) return NextResponse.json(FAILURE_MESSAGE);

  const queryParams = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
  });

  const res = await fetch(
    `https://oauth2.googleapis.com/token?${queryParams.toString()}`,
    {
      method: 'POST',
    },
  );

  const data = await res.json();

  const { access_token, expires_in } = data;

  if (data.error || !access_token || !expires_in) {
    return NextResponse.json(FAILURE_MESSAGE);
  }

  const sessionId = generateSessionId();
  console.log('created sessionId', sessionId);

  const userRes = await fetch(
    'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
  const userData = await userRes.json();
  const { name, email } = userData;

  if (!name || !email) {
    return NextResponse.json(FAILURE_MESSAGE);
  }

  const newEntry = {
    sessionId,
    name,
    email,
    access_token,
  };

  const userCollection = await getCollection('users');
  console.log('updating db');
  const dbRes = await userCollection.findOneAndUpdate(
    { name, email },
    { $set: newEntry },
  );
  if (!dbRes) {
    await userCollection.insertOne(newEntry);
  }

  return NextResponse.json({ sessionId });
}
