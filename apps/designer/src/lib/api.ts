import { cookies } from 'next/headers'
import { API_URL } from './constants'

export const fetchAPI = async (url: string, options: RequestInit) => {
  const token = cookies().get('token')?.value as string

  const res = await fetch(API_URL + url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json()

  return data
}
