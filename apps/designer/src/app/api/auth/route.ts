import { connectToDataBase } from '@/lib/db.utils'
import {
  registerLocalUser,
  validateEmail,
} from '@/app/api/api-services/auth/auth.services'
import Users from '@/app/api/api-services/auth/users.schema'
import { StatusCodes } from 'http-status-codes'

//@ User registration
export async function POST(req: any) {
  try {
    await connectToDataBase()

    const data = await req.json()
    let userExist = await Users.findOne({
      email: String(data.email).trim().toLowerCase(),
    })

    if (userExist) {
      return Response.json(
        { message: 'User already exists' },
        { status: StatusCodes.CONFLICT },
      )
    }

    let result = await registerLocalUser(data)

    return Response.json(result)
  } catch (error) {
    console.log('REGISTRATION ERROR:', error)
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}

//@ Email verification
export async function PUT(req: any) {
  try {
    await connectToDataBase()
    const data = await req.json()

    let { activation_token } = data

    let userExists = await Users.findOne({
      activation_token,
    })

    if (!userExists) {
      return Response.json(
        { message: 'Invalid activation' },
        { status: StatusCodes.BAD_REQUEST },
      )
    }

    await validateEmail(activation_token, userExists._id)

    return Response.json({ message: 'Activation successful' })
  } catch (error) {
    console.log('REGISTRATION ERROR:', error)
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}
