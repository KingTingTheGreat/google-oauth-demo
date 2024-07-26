import { NextResponse, type NextRequest } from 'next/server';
import { COOKIE_NAME, SUCCESS_MESSAGE } from './constants';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/auth')) {
    console.log('middleware');

    const cookie = req.cookies.get(COOKIE_NAME);

    if (!cookie) {
      console.log('no cookie');
      return NextResponse.redirect(req.nextUrl.origin);
    }

    const { sessionId } = JSON.parse(cookie.value);

    if (!sessionId) {
      console.log('no session id');
      return Response.redirect(new URL('/', req.url));
    }

    const verifyUrl = req.nextUrl.origin + '/api/verify';
    const res = await fetch(verifyUrl, {
      method: 'POST',
      body: JSON.stringify({ sessionId }),
    });
    const data = await res.json();

    if (data.message !== SUCCESS_MESSAGE) {
      console.log('failed to verify sessionId');
      return NextResponse.redirect(req.nextUrl.origin);
    }
    console.log('verified session id');
  }
}
