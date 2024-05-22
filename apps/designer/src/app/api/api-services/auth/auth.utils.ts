import jwt, { JwtPayload } from 'jsonwebtoken'

export const validateAuthToken = (token: string): null | JwtPayload => {
  if (!token) {
    return null
  }

  const secretKey = process.env.JWT_SECRET_KEY as string

  try {
    const decoded = jwt.verify(token, secretKey)
    return decoded as JwtPayload
  } catch (error) {
    return null
  }
}
