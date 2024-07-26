import {
  COOKIE_NAME,
  FAILURE_MESSAGE,
  SUCCESS_MESSAGE,
  USERS_COLLECTION,
} from '@/constants'
import { NextRequest, NextResponse } from 'next/server'
import getCollection from '@/db'

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME)

  if (!cookie) {
    console.log('no cookie present')
    return NextResponse.json({ message: FAILURE_MESSAGE })
  }

  const { sessionId } = JSON.parse(cookie.value)

  if (!sessionId) {
    console.log('no session id')
    return NextResponse.json({ message: FAILURE_MESSAGE })
  }

  const userCollection = await getCollection(USERS_COLLECTION)
  const userDocument = await userCollection.findOne({ sessionId })

  if (!userDocument) {
    console.log('invalid session id')
    return NextResponse.json({ message: FAILURE_MESSAGE })
  }

  return NextResponse.json({ message: SUCCESS_MESSAGE })
}
