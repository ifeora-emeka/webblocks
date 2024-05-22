import { connectToDataBase } from '@/lib/db.utils'
import Users from '@/app/api/api-services/auth/users.schema'
//@ts-ignore
import bcrypt from 'bcryptjs'

// send password reset request
export const POST = async (req: any) => {
  try {
    await connectToDataBase()
    const data = await req.json()

    data.email = String(data.email).trim().toLowerCase()

    let userExists = await Users.findOneAndUpdate(
      {
        email: data.email,
      },
      {
        reset_token: crypto.randomUUID().toString(),
      },
    )

    if (!userExists) {
      return Response.json({ message: 'User not found' }, { status: 404 })
    }

    return Response.json({ message: 'Email sent successfully' })
  } catch (error) {
    console.log('PASSWORD RESET REQUEST ERROR:', error)
    return Response.json({ message: 'Internal server error' }, { status: 500 })
  }
}

// reset password
export const PUT = async (req: any) => {
  try {
    await connectToDataBase()
    const data = await req.json()
    const { password, reset_token } = data

    // Clean up and hash the password
    const cleanedPassword = password.trim()
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(cleanedPassword, salt)

    // Update user password and reset token
    await Users.findOneAndUpdate(
      { reset_token },
      { password: hashedPassword, reset_token: null },
    )

    return new Response(
      JSON.stringify({ message: 'Password reset successfully' }),
      { status: 200 },
    )
  } catch (error) {
    console.log('PASSWORD RESET ERROR:', error)
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    })
  }
}
