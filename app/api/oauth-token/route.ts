import {
  CLIENT_ID,
  CLIENT_SECRET,
  FAILURE_MESSAGE,
  REDIRECT_URI,
  STATE_LENGTH,
} from "@/constants";
import { generateSessionId } from "@/util/generateSessionId";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const state = req.nextUrl.searchParams.get("state");
  if (!state || state.length !== STATE_LENGTH) {
    return NextResponse.redirect("/");
  }

  const queryParams = new URLSearchParams({
    scope: "https://www.googleapis.com/auth/cloud-platform",
    response_type: "code",
    access_type: "offline",
    state,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
  });

  return NextResponse.json(
    `https://accounts.google.com/o/oauth2/auth?${queryParams.toString()}`
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { code } = body;
  if (!body.code) return NextResponse.json(FAILURE_MESSAGE);

  const queryParams = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
  });

  const res = await fetch(
    `https://oauth2.googleapis.com/token?${queryParams.toString()}`,
    {
      method: "POST",
    }
  );

  const data = await res.json();

  const { access_token, refresh_token, expires_in } = data;
  console.log("data", data);

  if (data.error || !access_token || !expires_in) {
    return NextResponse.json(FAILURE_MESSAGE);
  }

  const sessionId = generateSessionId();
  console.log("created sessionId", sessionId);

  return NextResponse.json({ sessionId });
}
