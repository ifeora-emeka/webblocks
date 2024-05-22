import { connectToDataBase } from '@/lib/db.utils'
import {
  getAuthDependencies,
  loginUser,
} from '@/app/api/api-services/auth/auth.services'
import { headers } from 'next/headers'
import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'
import { validateAuthToken } from '../api-services/auth/auth.utils'

export const GET = async (req: any) => {
  try {
    await connectToDataBase()

    let authorization = headers().get('authorization') as string
    let auth = validateAuthToken(authorization)

    if (!auth) {
      return Response.json(
        { message: 'unauthorized' },
        { status: StatusCodes.UNAUTHORIZED },
      )
    }

    let result = await getAuthDependencies(auth?.user_id)

    return Response.json(result)
  } catch (error) {
    console.log('GET USER DEP ERROR::', error)
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
export const POST = async (req: any) => {
  try {
    await connectToDataBase()
    const data = await req.json()

    data.email = String(data.email).trim().toLocaleLowerCase()

    const result = loginSchema.safeParse(data)
    if (!result.success) {
      return Response.json(
        { message: 'Invalid login' },
        { status: StatusCodes.BAD_REQUEST },
      )
    }

    let authData = await loginUser(data)

    if (!authData) {
      return Response.json(
        { message: 'Invalid email or password' },
        { status: StatusCodes.BAD_REQUEST },
      )
    }

    return Response.json(authData)
  } catch (error) {
    console.log('LOGIN ERROR::', error)
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}
