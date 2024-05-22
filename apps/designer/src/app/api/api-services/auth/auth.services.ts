import Users, { UserDocument } from '@/app/api/api-services/auth/users.schema'
//@ts-ignore
import bcrypt from 'bcryptjs'
import { useBasicEmail as basicEmail } from '@/app/api/api-services/emails/basic/use-basic-email'
import sendEmail from '@/app/api/api-services/emails/mailer'
import { emailValidation } from '@/app/api/api-services/auth/auth.email'
import jwt from 'jsonwebtoken'

export const registerLocalUser = async (userData: UserDocument) => {
  try {
    userData.email = userData.email.trim().toLowerCase()
    userData.first_name = userData.first_name.trim().toLowerCase()
    userData.last_name = userData.last_name.trim().toLowerCase()
    userData.password = userData.password.trim()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)

    let activation_id = crypto.randomUUID().toString()

    let htmlString = await basicEmail({
      heading: 'Just one last step 🙏🏽',
      html_content: emailValidation(activation_id),
    })
    await sendEmail({
      htmlString,
      to: userData.email,
      subject: 'Email activation',
    })

    await Users.create({
      ...userData,
      password: hashedPassword,
      activation_token: activation_id,
    })

    return Promise.resolve({ message: 'Registration successful' })
  } catch (e) {
    console.log('REGISTRATION ERROR::', e)
    return Promise.reject(e)
  }
}

export const validateEmail = async (
  activationToken: string,
  user_id: string,
) => {
  try {
    let update = await Users.findOneAndUpdate(
      {
        activation_token: activationToken,
      },
      {
        activation_token: null,
      },
    )

    let theUser = await Users.findOne({
      _id: user_id,
    })

    if (!update) {
      return Promise.reject({ message: 'Invalid activation' })
    }

    return { message: 'Activation successful' }
  } catch (e) {
    return Promise.reject(e)
  }
}

export const getAuthDependencies = async (user_id: string) => {
  try {
    let user = await Users.findOne({
      _id: user_id,
    })

    return {
      user,
    }
  } catch (e) {
    return Promise.reject(e)
  }
}

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    let email = String(data.email).trim().toLocaleLowerCase()
    let password = String(data.password).trim()

    let user = await Users.findOne({ email }).populate('password')
    if (!user) {
      return null
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return null
    }

    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '1h',
      },
    )

    let theUser = await Users.findOne({ email })

    return {
      user: theUser,
      token,
    }
  } catch (error) {
    console.log('LOGIN USER ERROR::', error)
    return Promise.reject(error)
  }
}
