import { COOKIE_NAME } from '@/constants'
import { UserContextState } from '@/context/UserContext'
import Cookies from 'js-cookie'

const EXPIRES = 30

export const updateCookie = (newValues: Partial<UserContextState>) => {
  const cookie = Cookies.get(COOKIE_NAME)
  const stringifiedData = JSON.stringify(newValues)

  if (!cookie) {
    Cookies.set(COOKIE_NAME, stringifiedData, {
      expires: EXPIRES,
    })
  }

  const parsedCookieData = JSON.parse(stringifiedData) as UserContextState

  const mergedCookieData = JSON.stringify({
    ...parsedCookieData,
    ...newValues,
  })

  Cookies.set(COOKIE_NAME, mergedCookieData, {
    expires: EXPIRES,
  })
}

export const readCookie = () => {
  const cookie = Cookies.get(COOKIE_NAME)

  if (!cookie) return null

  const storedCookieData = JSON.parse(cookie) as UserContextState

  return storedCookieData
}
