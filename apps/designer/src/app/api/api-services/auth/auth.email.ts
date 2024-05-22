export const emailValidation = (validationToken: string): string => {
  let validationLink = `${process.env.CLIENT_URL}/auth/validation/${validationToken}`
  return `
    <span style="font-size: 17px;font-weight:400;line-height:24px;color:#1e1f21;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif">
      Hi there,
      <br /><br />
      Thank you for registering with our platform. Please confirm your email address by clicking the link below:
      <br /><br />
      <a href="${validationLink}" style="color: #1e90ff; text-decoration: none;">
        Validate Email Address
      </a>
      <br />
      <br />
      If you did not create an account, please ignore this email.
      <br />
      <br />
      Best regards,
      <br />
      The Team
    </span>
  `
}
