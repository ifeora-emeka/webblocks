import nodemailer from 'nodemailer'
import { APP_NAME } from '@/lib/constants'

export default async function sendEmail({
  to,
  htmlString,
  subject,
}: {
  to: string
  htmlString: string
  subject: string
}) {
  let user = process.env.ZOHO_BOT_EMAIL

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user,
      pass: process.env.ZOHO_BOT_PASSWORD,
    },
  })

  const mailOptions = {
    from: `${APP_NAME} <${user}>`,
    to,
    subject: `${subject} | ${APP_NAME}`,
    html: htmlString,
  }

  try {
    console.log('SENDING EMAIL TO:: ' + to)
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully \n')
  } catch (error) {
    console.log('Error sending email:', error)
    throw new Error('Failed to send email \n')
  }
}
