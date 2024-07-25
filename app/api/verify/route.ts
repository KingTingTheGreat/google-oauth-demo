import {
  FAILURE_MESSAGE,
  SESSION_ID_LENGTH,
  SUCCESS_MESSAGE,
} from "@/constants";
import { DB } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();

  if (!sessionId || !DB[sessionId]) {
    return NextResponse.json({ message: FAILURE_MESSAGE });
  }
  return NextResponse.json({ message: SUCCESS_MESSAGE });
}
